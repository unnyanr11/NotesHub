import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import {
  IndianRupee,
  ArrowLeft,
  Upload,
  Smartphone,
  Clock,
  Mail,
  AlertCircle,
  Link as LinkIcon,
  Image as ImageIcon,
} from 'lucide-react'
import { Note } from '../types/note'
import { sendPaymentVerificationEmail } from '../services/email'

/**
 * Checkout page for purchasing notes with QR code payment and email submission.
 * - Shows selected note summary and QR code to pay.
 * - Collects buyer info and screenshot evidence.
 * - Supports two screenshot modes:
 *   1) File upload (production)
 *   2) Paste public image URL (preview environments where uploads are blocked)
 * - Sends details via email (attachment when possible; otherwise includes URL).
 */
export default function CheckoutPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const noteId = searchParams.get('noteId')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  })

  // Screenshot input mode: 'file' is preferred, 'url' is fallback for restricted environments
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file')
  const [imageUrl, setImageUrl] = useState<string>('')

  /** Sample notes data (replace with your real source) */
  const notes: Note[] = [
    {
      id: '1',
      title: 'Complete Web Development Notes',
      price: 299,
      image:
        'https://pub-cdn.sider.ai/u/U0Z6HZJGK2R/web-coder/68aed41938697d89a13165db/resource/31d813b6-7000-4f61-85a3-475e1fd37ee9.jpg',
    },
    {
      id: '2',
      title: 'Advanced React & Redux Notes',
      price: 199,
      image:
        'https://pub-cdn.sider.ai/u/U0Z6HZJGK2R/web-coder/68aed41938697d89a13165db/resource/67b5c92e-31f7-4393-882e-f1a675233cf1.jpg',
    },
    {
      id: '3',
      title: 'Machine Learning Fundamentals Notes',
      price: 399,
      image:
        'https://pub-cdn.sider.ai/u/U0Z6HZJGK2R/web-coder/68aed41938697d89a13165db/resource/474499f6-47ab-4c87-8d71-7d134eaf29cb.jpg',
    },
    {
      id: '4',
      title: 'UI/UX Design Notes',
      price: 249,
      image:
        'https://pub-cdn.sider.ai/u/U0Z6HZJGK2R/web-coder/68aed41938697d89a13165db/resource/3334a09b-e541-4ce2-aa72-49148da2e0d4.jpg',
    },
    {
      id: '5',
      title: 'Cloud Computing with AWS Notes',
      price: 349,
      image:
        'https://pub-cdn.sider.ai/u/U0Z6HZJGK2R/web-coder/68aed41938697d89a13165db/resource/64857239-6fe4-4989-a913-f6e7a4257643.jpg',
    },
    {
      id: '6',
      title: 'Mobile App Development Notes',
      price: 279,
      image:
        'https://pub-cdn.sider.ai/u/U0Z6HZJGK2R/web-coder/68aed41938697d89a13165db/resource/5e30327c-0ab1-4ca9-864b-3a53b09cff66.jpg',
    },
  ]

  const selectedNote = notes.find((note) => note.id === noteId) || notes[0]

  useEffect(() => {
    if (!noteId) {
      navigate('/notes')
    }
  }, [noteId, navigate])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const url = URL.createObjectURL(selectedFile)
      setPreviewUrl(url)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate screenshot based on chosen mode
    if (uploadMode === 'file' && !file) {
      setError('Please upload your payment screenshot or switch to "Paste URL".')
      return
    }
    if (uploadMode === 'url' && !imageUrl.trim()) {
      setError('Please paste a public image URL to your payment screenshot.')
      return
    }

    setIsSubmitting(true)
    try {
      await sendPaymentVerificationEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        noteId,
        noteTitle: selectedNote.title,
        amount: selectedNote.price,
        file: uploadMode === 'file' ? file : null,
        imageUrl: uploadMode === 'url' ? imageUrl.trim() : undefined,
        // Critical for this preview: do NOT attach binary when using URL mode.
        attachFromImageUrl: uploadMode === 'url' ? false : undefined,
      })

      // Success: show verification modal
      setShowVerificationModal(true)
      // Optional: reset form
      setFile(null)
      setPreviewUrl(null)
      setImageUrl('')
      setFormData({ name: '', email: '', phone: '' })
    } catch (err: any) {
      // Provide a clearer hint when the host blocks file uploads
      const msg: string = err?.message || 'Failed to submit. Please try again.'
      if (msg.toLowerCase().includes('upload') || msg.toLowerCase().includes('file')) {
        setError(
          'Uploads appear to be blocked in this preview. Switch to "Paste URL" and submit again—your image link will be included in the email.'
        )
      } else {
        setError(msg)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBackToNotes = () => {
    navigate('/notes')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handleBackToNotes} className="bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Notes
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <img
                    src={selectedNote.image}
                    alt={selectedNote.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{selectedNote.title}</h3>
                    <div className="text-2xl font-bold text-green-600 flex items-center mt-2">
                      <IndianRupee className="w-5 h-5 mr-1" />
                      {selectedNote.price.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{selectedNote.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing Fee</span>
                    <span className="font-medium">₹0</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="text-xl font-bold text-green-600">
                      ₹{selectedNote.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* QR Code Payment Section */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  Scan to Pay
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="bg-blue-50 p-6 rounded-lg mb-4">
                    <img
                      src="https://pub-cdn.sider.ai/u/U0Z6HZJGK2R/web-coder/68aed41938697d89a13165db/resource/57ce9cf8-4b4b-48fe-85a9-05aeb596c032.jpg"
                      alt="Payment QR Code"
                      className="w-48 h-48 mx-auto object-contain"
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Scan this QR code with any UPI app</p>
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <p className="text-sm font-medium text-gray-700">Business UPI ID:</p>
                      <p className="text-lg font-mono text-blue-600">notehub@upi</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-gray-700">Amount to Pay:</p>
                      <p className="text-xl font-bold text-green-600">
                        ₹{selectedNote.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {/* Screenshot mode selector */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700">
                        Payment Screenshot {uploadMode === 'file' ? '*' : '(URL allowed)'}
                      </label>
                      <div className="inline-flex gap-2">
                        <Button
                          type="button"
                          variant={uploadMode === 'file' ? 'default' : 'outline'}
                          onClick={() => setUploadMode('file')}
                          className={uploadMode === 'file' ? '' : 'bg-transparent'}
                        >
                          <ImageIcon className="w-4 h-4 mr-2" />
                          Upload file
                        </Button>
                        <Button
                          type="button"
                          variant={uploadMode === 'url' ? 'default' : 'outline'}
                          onClick={() => setUploadMode('url')}
                          className={uploadMode === 'url' ? '' : 'bg-transparent'}
                        >
                          <LinkIcon className="w-4 h-4 mr-2" />
                          Paste URL
                        </Button>
                      </div>
                    </div>

                    {/* Hint for restricted preview environments */}
                    {uploadMode === 'file' && (
                      <div className="flex items-start gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 p-2.5 rounded mb-2">
                        <AlertCircle className="w-4 h-4 mt-0.5" />
                        <p>
                          If file uploads are blocked in this preview, switch to{' '}
                          <span className="font-medium">Paste URL</span> and provide a public image
                          link.
                        </p>
                      </div>
                    )}

                    {uploadMode === 'url' && (
                      <div className="flex items-start gap-2 text-sm text-blue-800 bg-blue-50 border border-blue-200 p-2.5 rounded mb-2">
                        <AlertCircle className="w-4 h-4 mt-0.5" />
                        <p>
                          Preview mode: your email will include the screenshot <b>link</b> but no
                          file attachment.
                        </p>
                      </div>
                    )}

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      {uploadMode === 'file' ? (
                        previewUrl ? (
                          <div className="space-y-3">
                            <img
                              src={previewUrl}
                              alt="Payment screenshot preview"
                              className="max-h-48 mx-auto object-contain"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                setFile(null)
                                setPreviewUrl(null)
                              }}
                              className="bg-transparent"
                            >
                              Remove
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                            <div>
                              <p className="text-sm text-gray-600">Upload payment screenshot</p>
                              <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                            </div>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              className="hidden"
                              id="file-upload"
                            />
                            <Button
                              type="button"
                              onClick={() => document.getElementById('file-upload')?.click()}
                              variant="outline"
                              className="bg-transparent"
                            >
                              Choose File
                            </Button>
                          </div>
                        )
                      ) : (
                        <div className="space-y-3">
                          <Input
                            type="url"
                            placeholder="Paste a public image URL (e.g., https://...)"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                          />
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt="Screenshot preview"
                              className="max-h-48 mx-auto object-contain rounded"
                            />
                          ) : null}
                          {imageUrl ? (
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setImageUrl('')}
                              className="bg-transparent"
                            >
                              Clear URL
                            </Button>
                          ) : null}
                        </div>
                      )}
                    </div>
                  </div>

                  {error && (
                    <div className="text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded">
                      {error}
                    </div>
                  )}

                  <p className="text-xs text-gray-500">
                    We will email your access link to{' '}
                    <span className="font-medium">{formData.email || 'your email'}</span> after
                    verification.
                  </p>

                  <Button
                    type="submit"
                    disabled={isSubmitting || (uploadMode === 'file' ? !file : !imageUrl.trim())}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {isSubmitting ? 'Submitting & Sending Email...' : 'Submit Payment'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Verification Modal */}
      {showVerificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Verification in Progress</h2>

            <p className="text-gray-600 mb-6">
              Thank you for your payment! We have received your details and screenshot via email. Our
              team is currently verifying your payment. This process typically takes up to 24 hours.
            </p>

            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Mail className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-900">What happens next?</span>
              </div>
              <ul className="text-sm text-blue-800 space-y-1 text-left">
                <li>• We'll verify your payment within 24 hours</li>
                <li>• Once verified, you'll receive an email with download link</li>
                <li>• Access to your notes will be granted immediately</li>
              </ul>
            </div>

            <Button
              onClick={() => {
                setShowVerificationModal(false)
                navigate('/notes')
              }}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Got it, I'll wait for the email
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
