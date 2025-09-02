/**
 * Checkout success component that displays after payment submission
 */
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { IndianRupee, ArrowLeft, Shield, Clock, BookOpen, User, Mail, Phone } from 'lucide-react'

interface CheckoutSuccessProps {
  selectedCourseId: string
  onBackToCourses: () => void
  userInfo?: {
    fullName: string
    contactNumber: string
    email: string
  }
}

export default function CheckoutSuccess({ selectedCourseId, onBackToCourses, userInfo }: CheckoutSuccessProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Sample course data
  const courses = [
    { 
      id: '1', 
      title: 'Complete Web Development Bootcamp', 
      price: 2999, 
      duration: '12 weeks',
      students: 15420,
      rating: 4.8,
      category: 'Web Development',
      description: 'Master modern web development with React, Node.js, and cutting-edge technologies. Build real-world projects.',
      tags: ['JavaScript', 'React', 'Node.js', 'HTML', 'CSS'],
      level: 'Beginner'
    },
    { 
      id: '2', 
      title: 'Data Science & Machine Learning', 
      price: 3999,
      duration: '16 weeks',
      students: 8934,
      rating: 4.9,
      category: 'Data Science',
      description: 'Dive deep into data science, machine learning algorithms, and AI. Work on real datasets and build ML models.',
      tags: ['Python', 'Machine Learning', 'TensorFlow', 'pandas'],
      level: 'Intermediate'
    },
    { 
      id: '3', 
      title: 'Digital Marketing Mastery', 
      price: 1999, 
      duration: '8 weeks',
      students: 6732,
      rating: 4.6,
      category: 'Marketing',
      description: 'Learn comprehensive digital marketing strategies including SEO, social media, and content marketing.',
      tags: ['SEO', 'Social Media', 'Google Ads', 'Email Marketing'],
      level: 'Beginner'
    },
    { 
      id: '4', 
      title: 'Mobile App Development with React Native', 
      price: 3499,
      duration: '10 weeks',
      students: 5421,
      rating: 4.7,
      category: 'Mobile Development',
      description: 'Build cross-platform mobile apps for iOS and Android using React Native and modern development tools.',
      tags: ['React Native', 'Mobile', 'iOS', 'Android'],
      level: 'Intermediate'
    },
    { 
      id: '5', 
      title: 'Advanced JavaScript & TypeScript', 
      price: 2499,
      duration: '6 weeks',
      students: 3210,
      rating: 4.9,
      category: 'Web Development',
      description: 'Master advanced JavaScript concepts and TypeScript for building scalable, modern applications.',
      tags: ['JavaScript', 'TypeScript', 'Advanced', 'ES6+'],
      level: 'Advanced'
    },
    { 
      id: '6', 
      title: 'UI/UX Design Fundamentals', 
      price: 1799, 
      duration: '8 weeks',
      students: 4567,
      rating: 4.7,
      category: 'Design',
      description: 'Learn the principles of user interface and user experience design with hands-on projects.',
      tags: ['UI Design', 'UX Design', 'Figma', 'Prototyping'],
      level: 'Beginner'
    },
    { 
      id: '7', 
      title: 'Cloud Computing with AWS', 
      price: 4499,
      duration: '14 weeks',
      students: 2890,
      rating: 4.8,
      category: 'Cloud Computing',
      description: 'Master AWS services, cloud architecture, and deploy scalable applications on the cloud.',
      tags: ['AWS', 'Cloud', 'DevOps', 'Infrastructure'],
      level: 'Intermediate'
    },
    { 
      id: '8', 
      title: 'Blockchain & Cryptocurrency', 
      price: 5999,
      duration: '12 weeks',
      students: 1567,
      rating: 4.5,
      category: 'Blockchain',
      description: 'Understand blockchain technology, smart contracts, and build decentralized applications.',
      tags: ['Blockchain', 'Cryptocurrency', 'Smart Contracts', 'Web3'],
      level: 'Advanced'
    }
  ]

  // Sample notes data
  const notes = [
    { 
      id: 'n1', 
      title: 'Complete JavaScript Notes for Beginners', 
      price: 299, 
      pages: 150,
      format: 'PDF',
      subject: 'Computer Science',
      downloadCount: 3240,
      lastUpdated: '2024-01-15',
      rating: 4.7,
      category: 'Programming',
      description: 'Comprehensive JavaScript notes covering all fundamental concepts, syntax, and practical examples. Perfect for beginners and interview preparation.',
      tags: ['JavaScript', 'ES6', 'DOM', 'Async', 'Interview'],
      level: 'Beginner'
    },
    { 
      id: 'n2', 
      title: 'Data Structures & Algorithms Handbook', 
      price: 499,
      pages: 200,
      format: 'PDF',
      subject: 'Computer Science',
      downloadCount: 2150,
      lastUpdated: '2024-01-20',
      rating: 4.9,
      category: 'Computer Science',
      description: 'Detailed notes on data structures, algorithms, and problem-solving techniques. Includes diagrams, examples, and practice problems.',
      tags: ['Algorithms', 'Data Structures', 'Complexity', 'Trees'],
      level: 'Intermediate'
    },
    { 
      id: 'n3', 
      title: 'Business Management Study Guide', 
      price: 399, 
      pages: 120,
      format: 'DOC',
      subject: 'Business Studies',
      downloadCount: 1870,
      lastUpdated: '2024-01-10',
      rating: 4.6,
      category: 'Business',
      description: 'Complete study guide for business management covering marketing, finance, operations, and strategic planning. Includes case studies and examples.',
      tags: ['Management', 'Marketing', 'Finance', 'Strategy'],
      level: 'Beginner'
    },
    { 
      id: 'n4', 
      title: 'Physics Formula Sheet & Concepts', 
      price: 199,
      pages: 80,
      format: 'PDF',
      subject: 'Physics',
      downloadCount: 4520,
      lastUpdated: '2024-01-18',
      rating: 4.8,
      category: 'Science',
      description: 'Essential physics formulas, concepts, and derivations for competitive exams. Well-organized and easy to understand.',
      tags: ['Physics', 'Formulas', 'Mechanics', 'Thermodynamics'],
      level: 'Intermediate'
    },
    { 
      id: 'n5', 
      title: 'Advanced React Development Notes', 
      price: 599,
      pages: 180,
      format: 'PDF',
      subject: 'Computer Science',
      downloadCount: 1250,
      lastUpdated: '2024-01-22',
      rating: 4.9,
      category: 'Programming',
      description: 'In-depth React notes covering hooks, context API, performance optimization, and best practices. Includes project examples.',
      tags: ['React', 'Hooks', 'Redux', 'Performance'],
      level: 'Advanced'
    },
    { 
      id: 'n6', 
      title: 'Mathematics Quick Revision Notes', 
      price: 249, 
      pages: 100,
      format: 'PDF',
      subject: 'Mathematics',
      downloadCount: 3890,
      lastUpdated: '2024-01-12',
      rating: 4.7,
      category: 'Mathematics',
      description: 'Quick revision notes for mathematics covering calculus, algebra, geometry, and statistics. Perfect for exam preparation.',
      tags: ['Calculus', 'Algebra', 'Geometry', 'Statistics'],
      level: 'Beginner'
    },
    { 
      id: 'n7', 
      title: 'Digital Marketing Strategy Guide', 
      price: 449,
      pages: 140,
      format: 'PPT',
      subject: 'Business Studies',
      downloadCount: 980,
      lastUpdated: '2024-01-16',
      rating: 4.5,
      category: 'Marketing',
      description: 'Comprehensive digital marketing notes covering SEO, social media, content marketing, and analytics. Includes real-world examples.',
      tags: ['SEO', 'Social Media', 'Content', 'Analytics'],
      level: 'Intermediate'
    },
    { 
      id: 'n8', 
      title: 'Machine Learning Fundamentals', 
      price: 699,
      pages: 250,
      format: 'PDF',
      subject: 'Computer Science',
      downloadCount: 670,
      lastUpdated: '2024-01-25',
      rating: 4.8,
      category: 'Computer Science',
      description: 'Introduction to machine learning concepts, algorithms, and applications. Includes Python examples and datasets.',
      tags: ['Machine Learning', 'Python', 'Algorithms', 'Data Science'],
      level: 'Advanced'
    }
  ]

  const getDiscountedPrice = (product: any) => {
    return product.price
  }

  const selectedCourse = courses.find(c => c.id === selectedCourseId) || notes.find(n => n.id === selectedCourseId)
  const isCourse = courses.find(c => c.id === selectedCourseId)
  const isNote = notes.find(n => n.id === selectedCourseId)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        
        {/* Success particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-green-400 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `success-particle ${2 + Math.random() * 3}s ease-out forwards`,
              animationDelay: `${Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className={`relative transform transition-all duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-2xl border-0 overflow-hidden">
          <div className="text-center pb-8 bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <svg className="w-12 h-12 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <CardTitle className="text-3xl font-bold text-white animate-pulse">Payment Verification Form Submitted!</CardTitle>
            <CardDescription className="text-green-100 text-lg">
              Thank you for your purchase. We will verify your payment shortly within 24 hours. You will receive an email with the course access link once the verification is complete.
            </CardDescription>
          </div>
          <CardContent className="pt-8 p-6">
            <div className="space-y-4 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 transform transition-all duration-300 hover:scale-105">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-800">Verification in Progress</p>
                    <p className="text-sm text-green-600">We'll verify your payment shortly within 24 hours</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg transform transition-all duration-300 hover:scale-105">
                  <span className="font-medium">Item:</span>
                  <span className="text-right max-w-[60%]">{selectedCourse?.title}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg transform transition-all duration-300 hover:scale-105">
                  <span className="font-medium">Type:</span>
                  <div className="flex items-center space-x-2">
                    {isCourse ? (
                      <>
                        <BookOpen className="w-4 h-4 text-blue-500" />
                        <span>Course</span>
                      </>
                    ) : isNote ? (
                      <>
                        <BookOpen className="w-4 h-4 text-purple-500" />
                        <span>Study Notes</span>
                      </>
                    ) : (
                      <span>Unknown</span>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg transform transition-all duration-300 hover:scale-105">
                  <span className="font-medium">Amount:</span>
                  <div className="flex items-center text-green-600 font-bold text-xl">
                    <IndianRupee className="w-5 h-5" />
                    {selectedCourse ? getDiscountedPrice(selectedCourse).toLocaleString() : '0'}
                  </div>
                </div>
                {userInfo && (
                  <>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg transform transition-all duration-300 hover:scale-105">
                      <span className="font-medium">Name:</span>
                      <span className="text-right max-w-[60%]">{userInfo.fullName}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg transform transition-all duration-300 hover:scale-105">
                      <span className="font-medium">Email:</span>
                      <span className="text-right max-w-[60%]">{userInfo.email}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg transform transition-all duration-300 hover:scale-105">
                      <span className="font-medium">Contact:</span>
                      <span className="text-right max-w-[60%]">{userInfo.contactNumber}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg transform transition-all duration-300 hover:scale-105">
                  <span className="font-medium">Status:</span>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-yellow-500 animate-pulse" />
                    <span className="text-yellow-600 font-medium">Pending Verification</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button 
                onClick={onBackToCourses}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                {isCourse ? 'Back to Courses' : 'Back to Notes'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <style>{`
        @keyframes success-particle {
          0% {
            transform: translateY(0) scale(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) scale(1);
            opacity: 0;
          }
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  )
}
