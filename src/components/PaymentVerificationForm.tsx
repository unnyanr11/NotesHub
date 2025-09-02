/**
 * Payment Verification Form component for handling payment screenshot upload and user information
 */
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Upload, FileText, BookOpen, CheckCircle, AlertCircle, Shield, User, Mail, Phone, Camera } from 'lucide-react'

interface PaymentVerificationFormProps {
  selectedCourseId: string
  onFormSubmit: (itemId: string, screenshot: File, userInfo: { fullName: string; contactNumber: string; email: string }) => void
  isSubmitting: boolean
  error: string
}

export default function PaymentVerificationForm({ 
  selectedCourseId, 
  onFormSubmit, 
  isSubmitting, 
  error 
}: PaymentVerificationFormProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    contactNumber: '',
    email: ''
  })
  const [isCourse, setIsCourse] = useState(false)
  const [isNote, setIsNote] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    // Auto-detect item type from URL
    if (selectedCourseId) {
      if (selectedCourseId.startsWith('n')) {
        setIsNote(true)
        setIsCourse(false)
      } else {
        setIsCourse(true)
        setIsNote(false)
      }
    }
  }, [selectedCourseId])

  const handleFileChange = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setScreenshot(file)
      setUploadProgress(100)
    } else {
      alert('Please upload an image file')
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileChange(files[0])
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setUserInfo(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onFormSubmit(selectedCourseId, screenshot!, userInfo)
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 overflow-hidden transform transition-all duration-500 hover:shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-pulse">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Payment Verification</CardTitle>
            <p className="text-purple-100">
              Upload payment screenshot and provide your details
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Auto-filled Item Information */}
          {selectedCourseId && (
            <div className="space-y-4">
              
                
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium text-green-800">
                    {isCourse ? 'Notes' : 'Notes'} selected for purchase
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
              <User className="w-5 h-5 text-blue-500" />
              <span>Personal Information</span>
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-base font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={userInfo.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-medium text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={userInfo.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactNumber" className="text-base font-medium text-gray-700">
                  Contact Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="contactNumber"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={userInfo.contactNumber}
                  onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                  className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
                  required
                />
              </div>
            </div>
          </div>

          {/* Payment Screenshot Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
              <Camera className="w-5 h-5 text-purple-500" />
              <span>Payment Screenshot</span>
            </h3>
            
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                isDragging
                  ? 'border-purple-500 bg-purple-50'
                  : screenshot
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {screenshot ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-2 text-green-600">
                    <CheckCircle className="w-6 h-6" />
                    <span className="font-medium">Screenshot uploaded successfully!</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <FileText className="w-4 h-4" />
                    <span>{screenshot.name}</span>
                    <Badge className="bg-green-100 text-green-700">
                      {(screenshot.size / 1024 / 1024).toFixed(2)} MB
                    </Badge>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setScreenshot(null)}
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    Remove File
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <Upload className="w-12 h-12 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-700 mb-2">
                      {isDragging ? 'Drop your screenshot here' : 'Upload Payment Screenshot'}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      Drag and drop your payment screenshot here, or click to browse
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <input
                      type="file"
                      id="screenshot"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileChange(e.target.files[0])
                        }
                      }}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      onClick={() => document.getElementById('screenshot')?.click()}
                      className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
                    >
                      Choose File
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Supported formats: JPG, PNG, GIF (Max 10MB)
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3 animate-pulse">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-14 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold text-lg py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting || !screenshot || !userInfo.fullName || !userInfo.contactNumber || !userInfo.email}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Submitting...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <span>Submit Payment Verification</span>
                <Shield className="w-5 h-5" />
              </div>
            )}
          </Button>

          {/* Security Note */}
          <div className="text-center">
            <p className="text-xs text-gray-500">
              Your information is secure and encrypted. We'll verify your payment within 24 hours.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}