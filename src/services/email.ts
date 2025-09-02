/**
 * Email service to send payment verification details using Web3Forms.
 * - No backend required.
 * - Supports file attachments up to 10MB.
 * - Fallback: can include a public image URL if file uploads are blocked.
 *
 * Also provides a contact form email sender to route support inquiries.
 *
 * Note: Some preview environments block binary uploads (FormData with files).
 * To avoid that, we allow "URL-only" submissions where the screenshot URL is
 * included in the email body without attaching any file.
 */

export interface PaymentEmailPayload {
  /** Full name of buyer */
  name: string
  /** Buyer email */
  email: string
  /** Buyer phone number */
  phone: string
  /** Internal note id (if available) */
  noteId?: string | null
  /** Display title of the note/product */
  noteTitle: string
  /** Amount in INR */
  amount: number
  /** Uploaded payment screenshot (preferred in production) */
  file?: File | null
  /** Publicly accessible screenshot URL (fallback for preview envs) */
  imageUrl?: string
  /**
   * When true, we will attempt to fetch imageUrl and attach it as a file.
   * Many preview envs block binary uploads; keep this false there.
   * Default: false.
   */
  attachFromImageUrl?: boolean
}

/** Contact form payload shape */
export interface ContactEmailPayload {
  /** Sender full name */
  name: string
  /** Sender email */
  email: string
  /** Optional phone (plain or formatted) */
  phone?: string
  /** Subject line from the form */
  subject: string
  /** Selected category (e.g., technical, billing, course, account, general) */
  category: string
  /** Detailed message from the user */
  message: string
}

interface EmailProviderConfig {
  provider: 'web3forms'
  /** Get from https://web3forms.com */
  accessKey: string
  /** Optional: override dashboard recipient(s). Comma separated. */
  notifyTo?: string
}

/**
 * Update these values to your own before production use.
 */
const emailConfig: EmailProviderConfig = {
  provider: 'web3forms',
  accessKey: '0e427688-9522-4c7a-9e25-b42dd71631c3',
  // Optional: set your recipient(s) here, e.g. 'owner@example.com, team@example.com'
  notifyTo: 'unnyanr11@gmail.com',
}

/**
 * Attempts to fetch an image URL and convert to a File for attachment.
 * Returns null on any failure (commonly CORS), so callers can gracefully fallback.
 */
async function tryCreateFileFromUrl(url: string): Promise<File | null> {
  try {
    const res = await fetch(url, { mode: 'cors' })
    if (!res.ok) return null
    const blob = await res.blob()
    if (!blob || blob.size === 0) return null
    if (blob.size > 10 * 1024 * 1024) return null
    const mime = blob.type || 'image/jpeg'
    const ext = mime.split('/')[1] || 'jpg'
    return new File([blob], `payment-screenshot.${ext}`, { type: mime })
  } catch {
    return null
  }
}

/**
 * Sends the payment verification email.
 * - Prefers a file attachment when provided.
 * - Optionally can attach an image fetched from `imageUrl` (attachFromImageUrl=true).
 * - If attachments are not possible in current environment, keep attachFromImageUrl=false
 *   so only the URL is included in the email body.
 */
export async function sendPaymentVerificationEmail(payload: PaymentEmailPayload) {
  if (!emailConfig.accessKey || emailConfig.accessKey.startsWith('REPLACE_')) {
    throw new Error(
      'Email service not configured. Please set your Web3Forms accessKey in src/services/email.ts'
    )
  }

  const form = new FormData()
  form.append('access_key', emailConfig.accessKey)

  // Optional: override recipients (leave out to use dashboard default)
  if (emailConfig.notifyTo) {
    form.append('to', emailConfig.notifyTo)
  }

  // Email subject and structured message
  form.append('subject', 'New Payment Verification Submitted')
  form.append(
    'message',
    [
      `A new payment verification has been submitted.`,
      '',
      `Buyer: ${payload.name}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone}`,
      payload.noteId ? `Note ID: ${payload.noteId}` : undefined,
      `Note Title: ${payload.noteTitle}`,
      `Amount: ₹${payload.amount.toLocaleString('en-IN')}`,
      payload.imageUrl
        ? `Screenshot URL: ${payload.imageUrl} (attached only if allowed)`
        : undefined,
      '',
      'An image attachment is included if you uploaded a file.',
      payload.attachFromImageUrl
        ? 'We also attempted to attach the image from the provided URL.'
        : 'For preview environments, we are not attaching files to avoid upload restrictions.',
    ]
      .filter(Boolean)
      .join('\n')
  )

  // Recommended standard fields for Web3Forms
  form.append('from_name', payload.name)
  form.append('from_email', payload.email)
  // Reply-to ensures you can reply directly to the buyer
  form.append('replyto', payload.email)

  // Include additional fields to show as key-value in email
  form.append('Buyer Name', payload.name)
  form.append('Buyer Email', payload.email)
  form.append('Buyer Phone', payload.phone)
  if (payload.noteId) form.append('Note ID', String(payload.noteId))
  form.append('Note Title', payload.noteTitle)
  form.append('Amount (INR)', `₹${payload.amount.toLocaleString('en-IN')}`)
  if (payload.imageUrl) form.append('Screenshot URL', payload.imageUrl)

  // Attachment handling
  let attached = false
  if (payload.file) {
    if (payload.file.size > 10 * 1024 * 1024) {
      throw new Error('Attachment too large. Max 10MB allowed.')
    }
    form.append('attachments[]', payload.file, payload.file.name)
    attached = true
  } else if (payload.imageUrl && payload.attachFromImageUrl) {
    // Best-effort to fetch and attach from URL; if blocked, the URL is still included above.
    const fetchedFile = await tryCreateFileFromUrl(payload.imageUrl)
    if (fetchedFile) {
      form.append('attachments[]', fetchedFile, fetchedFile.name)
      attached = true
    }
  }

  // Send
  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: form,
  })

  const data = (await res.json()) as { success: boolean; message?: string }

  if (!data.success) {
    // Surface a helpful hint if attachment failed because of environment restrictions
    const hint =
      !attached && payload.imageUrl && payload.attachFromImageUrl
        ? ' The image URL was included instead of an attachment (likely due to CORS or upload limits).'
        : ''
    throw new Error((data.message || 'Failed to send email') + hint)
  }
}

/**
 * Sends a contact/support inquiry email via Web3Forms.
 * - Uses the same provider config.
 * - No file attachments; text-only submission.
 * - Includes structured key-value fields for better readability in inbox.
 */
export async function sendContactSupportEmail(payload: ContactEmailPayload) {
  if (!emailConfig.accessKey || emailConfig.accessKey.startsWith('REPLACE_')) {
    throw new Error(
      'Email service not configured. Please set your Web3Forms accessKey in src/services/email.ts'
    )
  }

  const form = new FormData()
  form.append('access_key', emailConfig.accessKey)
  if (emailConfig.notifyTo) {
    form.append('to', emailConfig.notifyTo)
  }

  // Subject and message
  const subject = `New Contact Inquiry: ${payload.subject}`
  form.append('subject', subject)
  form.append(
    'message',
    [
      `A new contact inquiry has been submitted.`,
      '',
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      payload.phone ? `Phone: ${payload.phone}` : undefined,
      `Category: ${payload.category}`,
      '',
      'Message:',
      payload.message,
    ]
      .filter(Boolean)
      .join('\n')
  )

  // Standard recommended fields for Web3Forms
  form.append('from_name', payload.name)
  form.append('from_email', payload.email)
  form.append('replyto', payload.email)

  // Key-value pairs for the email body
  form.append('Sender Name', payload.name)
  form.append('Sender Email', payload.email)
  if (payload.phone) form.append('Sender Phone', payload.phone)
  form.append('Category', payload.category)
  form.append('Subject', payload.subject)
  form.append('Message', payload.message)

  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: form,
  })

  const data = (await res.json()) as { success: boolean; message?: string }
  if (!data.success) {
    throw new Error(data.message || 'Failed to send contact message')
  }
}
