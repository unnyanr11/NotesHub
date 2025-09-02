/**
 * Payment verification form component
 */
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Upload, Shield, Lock, BookOpen, User, Phone, Mail, CheckCircle } from 'lucide-react'

interface Notes {
  id: string
  title: string
  price: number
  discount?: number
}

interface PaymentVerificationFormProps {
  selectednotesId: string
  onFormSubmit: (notesId: string, screenshot: File, userInfo: { fullName: string; contactNumber: string; email: string }) => void
  isSubmitting: boolean
  error: string
}

export default function PaymentVerificationForm({ 
  selectednotesId, 
  onFormSubmit, 
  isSubmitting, 
  error 
}: PaymentVerificationFormProps) {
  const [selectednotesForForm, setSelectednotesForForm] = useState(selectednotesId)
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [fullName, setFullName] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [email, setEmail] = useState('')
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)

  // Sample Notes data
  const notess: Notes[] = [
    { id: '1', title: 'Complete Web Development Bootcamp', price: 2999, discount: 20 },
    { id: '2', title: 'Data Science & Machine Learning', price: 3999 },
    { id: '3', title: 'Digital Marketing Mastery', price: 1999, discount: 15 },
    { id: '4', title: 'Mobile App Development with React Native', price: 3499 },
    { id: '5', title: 'Advanced JavaScript & TypeScript', price: 2499 },
    { id: '6', title: 'UI/UX Design Fundamentals', price: 1799, discount: 10 },
    { id: '7', title: 'Cloud Computing with AWS', price: 4499 },
    { id: '8', title: 'Blockchain & Cryptocurrency', price: 5999 }
  ]

  const getDiscountedPrice = (Notes: Notes) => {
    if (Notes.discount) {
      return Math.round(Notes.price * (1 - Notes.discount / 100))
    }
    return Notes.price
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type.startsWith('image/')) {
        setPaymentScreenshot(file)
        
        // Simulate upload progress
        let progress = 0
        const interval = setInterval(() => {
          progress += 10
          setUploadProgress(progress)
          if (progress >= 100) {
            clearInterval(interval)
          }
        }, 100)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectednotesForForm || !paymentScreenshot || !fullName || !contactNumber || !email) {
      return
    }
    
    const userInfo = {
      fullName,
      contactNumber,
      email
    }
    
    onFormSubmit(selectednotesForForm, paymentScreenshot, userInfo)
    
    // Show success popup after form submission
    setShowSuccessPopup(true)
    
    // Hide popup after 5 seconds
    setTimeout(() => {
      setShowSuccessPopup(false)
    }, 5000)
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 overflow-hidden transform transition-all duration-500 hover:shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6">
        <div className="flex items-center space-x-3">
          <Shield className="w-8 h-8 animate-pulse" />
          <div>
            <CardTitle className="text-2xl font-bold">Payment Verification</CardTitle>
            <CardDescription className="text-purple-100">
              Upload your payment screenshot and select the Notes you purchased
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Notes Selection */}
          <div className="space-y-3">
            <Label htmlFor="Notes" className="text-lg font-semibold text-gray-800 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-purple-500" />
              Select Notes <span className="text-red-500">*</span>
            </Label>
            <Select value={selectednotesForForm} onValueChange={setSelectednotesForForm}>
              <SelectTrigger className="h-12 text-base border-2 border-gray-200 focus:border-purple-500 transition-colors duration-300">
                <SelectValue placeholder="Choose your Notes" />
              </SelectTrigger>
              <SelectContent>
                {notess.map((Notes) => (
                  <SelectItem 
                    key={Notes.id} 
                    value={Notes.id}
                    className="text-base py-3"
                  >
                    <div className="flex justify-between items-center w-full">
                      <span>{Notes.title}</span>
                      <div className="flex items-center space-x-2">
                        {Notes.discount && (
                          <span className="text-xs text-red-500 line-through">
                            ₹{Notes.price.toLocaleString()}
                          </span>
                        )}
                        <span className="text-green-600 font-semibold">
                          ₹{getDiscountedPrice(Notes).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Personal Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <User className="w-5 h-5 mr-2 text-purple-500" />
              Personal Information <span className="text-red-500">*</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-base font-medium text-gray-700 flex items-center">
                  <User className="w-4 h-4 mr-2 text-purple-500" />
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-12 text-base border-2 border-gray-200 focus:border-purple-500 transition-colors duration-300"
                  required
                />
              </div>

              {/* Contact Number */}
              <div className="space-y-2">
                <Label htmlFor="contactNumber" className="text-base font-medium text-gray-700 flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-purple-500" />
                  Contact Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="contactNumber"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="h-12 text-base border-2 border-gray-200 focus:border-purple-500 transition-colors duration-300"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-medium text-gray-700 flex items-center">
                <Mail className="w-4 h-4 mr-2 text-purple-500" />
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 text-base border-2 border-gray-200 focus:border-purple-500 transition-colors duration-300"
                required
              />
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-3">
            <Label htmlFor="screenshot" className="text-lg font-semibold text-gray-800 flex items-center">
              <Upload className="w-5 h-5 mr-2 text-purple-500" />
              Payment Screenshot <span className="text-red-500">*</span>
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition-all duration-300 hover:border-purple-400 transform hover:scale-105">
              <input
                id="screenshot"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="screenshot" className="cursor-pointer">
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4 transform transition-all duration-300 hover:text-purple-500 hover:scale-110" />
                <p className="text-gray-700 text-lg mb-2 font-medium">
                  {paymentScreenshot ? paymentScreenshot.name : 'Click to upload screenshot'}
                </p>
                <p className="text-sm text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </label>
              
              {/* Upload Progress */}
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Uploading... {uploadProgress}%</p>
                </div>
              )}
            </div>
          </div>

          {/* Security Note */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 transform transition-all duration-300 hover:scale-105">
            <div className="flex items-center space-x-3">
              <Lock className="w-5 h-5 text-green-600" />
              <div className="text-sm text-green-800">
                <p className="font-semibold">Your payment is secure</p>
                <p>All transactions are encrypted and protected</p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 transform transition-all duration-300 animate-pulse">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full h-14 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold text-lg py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Submitting...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <span>Submit Payment Proof</span>
                <Shield className="w-5 h-5" />
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
