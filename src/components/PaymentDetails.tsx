/**
 * Payment Details component that displays selected item information and UPI QR code
 */
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { IndianRupee, BookOpen, FileText, Clock, Users, Download, QrCode, Shield, User } from 'lucide-react'

interface Course {
  id: string
  title: string
  description: string
  price: number
  duration: string
  students: number
  rating: number
  category: string
  image?: string
  tags?: string[]
  level?: 'Beginner' | 'Intermediate' | 'Advanced'
  featured?: boolean
  discount?: number
  pages: number
  format: 'PDF' | 'DOC' | 'PPT' | 'Video'
  subject: string
  downloadCount: number
  lastUpdated: string
}
 

type PaymentItem = Course | null; 

interface PaymentDetailsProps {
  selectedItem: PaymentItem | null;  // Ensure PaymentItem is imported
}

export default function PaymentDetails({ selectedItem }: PaymentDetailsProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const getDiscountedPrice = (course: Course) => {
    return course.price
  }

  if (!selectedItem) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 overflow-hidden transform transition-all duration-500 hover:shadow-2xl">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-600">No item selected for purchase</p>
        </CardContent>
      </Card>
    )
  }

  const isCourse = 'pages' in selectedItem;

  return (
    <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 overflow-hidden transform transition-all duration-500 hover:shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-pulse">
            {isCourse ? <BookOpen className="w-6 h-6 text-white" /> : <FileText className="w-6 h-6 text-white" />}
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Payment Details</CardTitle>
            <p className="text-blue-100">
              Complete your purchase for {isCourse ? 'notes' : 'note'}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Item Information */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 transform transition-all duration-300 hover:scale-105">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                {isCourse ? <BookOpen className="w-8 h-8 text-white" /> : <FileText className="w-8 h-8 text-white" />}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedItem.title}</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge className="bg-blue-100 text-blue-700">{selectedItem.category}</Badge>
                  {isCourse && selectedItem.level && (
                    <Badge className="bg-green-100 text-green-700">{selectedItem.level}</Badge>
                  )}
                  
                </div>
                <p className="text-gray-600 text-sm">{selectedItem.description}</p>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6 transform transition-all duration-300 hover:border-blue-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                <div className="flex items-center space-x-2">
                  <IndianRupee className="w-6 h-6 text-green-600" />
                  
                </div>
              </div>
              <div className="text-right">
                <Badge className="bg-green-100 text-green-700 text-lg px-3 py-1">Best Price</Badge>
              </div>
            </div>
          </div>

          

          {/* UPI Payment Section */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <QrCode className="w-6 h-6 text-purple-600" />
              <h4 className="text-lg font-bold text-gray-800">UPI Payment</h4>
            </div>
            <div className="text-center space-y-4">
              <div className="w-48 h-48 bg-white rounded-xl mx-auto p-4 shadow-lg transform transition-all duration-300 hover:scale-105">
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                  <QrCode className="w-24 h-24 text-gray-400" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Scan QR code with any UPI app</p>
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <p className="font-mono text-sm text-gray-800">noteshub@upi</p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Note */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 transform transition-all duration-300 hover:scale-105">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-green-600" />
              <div className="text-sm text-green-800">
                <p className="font-semibold">Secure Payment</p>
                <p>Your transaction is encrypted and protected</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}