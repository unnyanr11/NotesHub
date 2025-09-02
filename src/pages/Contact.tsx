/**
 * Contact page for user support and help inquiries
 * - Submits the contact form via Web3Forms email (no backend).
 * - Validates fields and phone format hints.
 * - Shows success state on successful email submission.
 */

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  HelpCircle, 
  MessageCircle, 
  BookOpen,
  Users,
  Star,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { sendContactSupportEmail } from '../services/email'

interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  category: string
  message: string
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  /**
   * Handles local state update with phone formatting for better readability.
   */
  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    // Phone number formatting
    if (field === 'phone') {
      // Remove all non-digit characters
      const cleaned = value.replace(/\D/g, '')
      
      // Format as +91 XXXXX XXXXX for Indian numbers
      if (cleaned.length > 0) {
        let formatted = ''
        if (cleaned.length <= 2) {
          formatted = `+${cleaned}`
        } else if (cleaned.length <= 7) {
          formatted = `+${cleaned.slice(0, 2)} ${cleaned.slice(2)}`
        } else {
          formatted = `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 7)} ${cleaned.slice(7, 12)}`
        }
        setFormData(prev => ({ ...prev, [field]: formatted }))
      } else {
        setFormData(prev => ({ ...prev, [field]: '' }))
      }
    } else {
      setFormData(prev => ({ ...prev, [field]: value }))
    }
    setError('')
  }

  /**
   * Simple phone validation supporting Indian format and international lengths.
   */
  const validatePhoneNumber = (phone: string): boolean => {
    // Remove all non-digit characters for validation
    const cleaned = phone.replace(/\D/g, '')
    
    // Check if it's a valid Indian phone number (10 digits after country code)
    // Format should be +91 followed by 10 digits
    if (cleaned.startsWith('91') && cleaned.length === 12) {
      return true
    }
    
    // Allow international numbers (10-15 digits total)
    if (cleaned.length >= 10 && cleaned.length <= 15) {
      return true
    }
    
    return false
  }

  /**
   * Submit handler: validates fields and sends email via Web3Forms.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name || !formData.email || !formData.subject || !formData.category || !formData.message) {
      setError('Please fill in all required fields')
      return
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    // Phone validation (optional field but must be valid if provided)
    if (formData.phone && !validatePhoneNumber(formData.phone)) {
      setError('Please enter a valid phone number (e.g., +91 98765 43210)')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      await sendContactSupportEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        subject: formData.subject,
        category: formData.category,
        message: formData.message,
      })
      setIsSubmitted(true)
    } catch (err: any) {
      const msg = err?.message || 'Failed to send your message. Please try again.'
      setError(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      category: '',
      message: ''
    })
    setIsSubmitted(false)
    setError('')
  }

  const faqs = [
    {
      question: 'How do I access my purchased notes?',
      answer: 'After your payment is verified, you will receive an email with notes access details.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We currently accept UPI payments through QR code scanning.'
    },
    {
      question: 'How long does payment verification take?',
      answer: 'Payment verification typically takes 24-48 hours. You will receive a confirmation email once your access is granted.'
    },
    {
      question: 'Can I get a refund?',
      answer: 'Refunds are not available.'
    },
  ]

  const supportCategories = [
    { value: 'technical', label: 'Technical Support', icon: '🔧' },
    { value: 'billing', label: 'Billing & Payments', icon: '💳' },
    { value: 'course', label: 'Notes Content', icon: '📚' },
    { value: 'account', label: 'Account Issues', icon: '👤' },
    { value: 'general', label: 'General Inquiry', icon: '❓' }
  ]

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className={`max-w-md w-full transform transition-all duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 overflow-hidden">
            <div className="text-center p-8 bg-gradient-to-br from-green-500 to-emerald-600 text-white">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-white">Message Sent!</CardTitle>
              <CardDescription className="text-green-100 text-lg mt-2">
                Thank you for contacting us
              </CardDescription>
            </div>
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <p className="text-gray-700">
                  We've received your message and will get back to you within 24 hours.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-medium">
                    Our team will contact you at: <span className="text-green-600">{formData.email}</span>
                  </p>
                </div>
                <div className="flex space-x-3">
                  <Button 
                    onClick={handleReset}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  >
                    Send Another Message
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => window.history.back()}
                    className="flex-1 border-green-500 text-green-600 hover:bg-green-50"
                  >
                    Go Back
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <header className="bg-white/90 backdrop-blur-sm shadow-lg border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()}
              className="mr-4 transform transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Contact &amp; Support
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-bounce">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How Can We Help You?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Our support team is here to assist you with any questions or concerns
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className={`lg:col-span-2 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 overflow-hidden transform transition-all duration-500 hover:shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-8 h-8 animate-pulse" />
                  <div>
                    <CardTitle className="text-2xl font-bold">Send us a Message</CardTitle>
                    <CardDescription className="text-purple-100">
                      Fill out the form below and we'll get back to you soon
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-base font-medium text-gray-700">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base font-medium text-gray-700">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-base font-medium text-gray-700">
                        Phone Number <span className="text-gray-400 text-sm">(Optional)</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
                      />
                      <p className="text-xs text-gray-500">Format: +91 98765 43210 (Indian) or international format</p>
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-base font-medium text-gray-700">
                        Subject <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="subject"
                        type="text"
                        placeholder="Brief description of your inquiry"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-base font-medium text-gray-700">
                      Category <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {supportCategories.map((category) => (
                          <SelectItem key={category.value} value={category.value} className="text-base py-3">
                            <div className="flex items-center space-x-2">
                              <span>{category.icon}</span>
                              <span>{category.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-base font-medium text-gray-700">
                      Message <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Please describe your issue or question in detail..."
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="min-h-[150px] text-base border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300 resize-none"
                      required
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      <p className="text-red-600 text-sm font-medium">{error}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full h-14 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold text-lg py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <span>Send Message</span>
                        <Send className="w-5 h-5" />
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information & FAQ */}
          <div className={`space-y-8 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            {/* Contact Information */}
            <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold">Get in Touch</CardTitle>
                    <CardDescription className="text-purple-100">
                      Reach out to us through any of these channels
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg transform transition-all duration-300 hover:scale-105">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Email</p>
                      <p className="text-blue-600">unnyanr11@gmail.com</p>
                    </div>
                  </div>
                
                  <div className="flex items-center space-x-4 p-3 bg-purple-50 rounded-lg transform transition-all duration-300 hover:scale-105">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Office</p>
                      <p className="text-purple-600">Mumbai, India</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-3 bg-orange-50 rounded-lg transform transition-all duration-300 hover:scale-105">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Business Hours</p>
                      <p className="text-orange-600">Mon-Fri: 9AM-6PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick FAQ */}
            <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold">Quick FAQ</CardTitle>
                    <CardDescription className="text-purple-100">
                      Find answers to common questions
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-md">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-blue-600 text-sm font-bold">Q</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800 mb-2">{faq.question}</p>
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-green-600 text-sm font-bold">A</span>
                            </div>
                            <p className="text-gray-600 text-sm">{faq.answer}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
              
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <Star className="w-8 h-8 text-white" />
            </div>
          </div>
          <p className="text-lg mb-4">Need immediate help?</p>
          <p className="text-gray-400">Our support team is available 24/7 to assist you</p>
        </div>
      </footer>
      <style>{`
        @keyframes float-particle {
          0%, 100% { 
            transform: translateY(0px) translateX(0px); 
            opacity: 0.6;
          }
          25% { 
            transform: translateY(-20px) translateX(10px); 
            opacity: 1;
          }
          50% { 
            transform: translateY(-10px) translateX(-10px); 
            opacity: 0.8;
          }
          75% { 
            transform: translateY(-30px) translateX(5px); 
            opacity: 0.9;
          }
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-float-particle {
          animation: float-particle 8s ease-in-out infinite;
        }
        
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 6s ease infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

    </div>
  )
}
