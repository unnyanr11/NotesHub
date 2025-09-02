/**
 * Welcome page that redirects users to the main course page
 */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { BookOpen, GraduationCap, Sparkles, ArrowRight, Zap, Star, Heart } from 'lucide-react'

export default function Welcome() {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 3.33 // 100% in 3 seconds (30 intervals)
      })
    }, 100)

    // Auto-redirect after 3 seconds
    const timer = setTimeout(() => {
      navigate('/notes')
    }, 3000)
    
    return () => {
      clearTimeout(timer)
      clearInterval(progressInterval)
    }
  }, [navigate])

  const handleManualRedirect = () => {
    navigate('/courses')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large floating orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-medium animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-fast animation-delay-4000"></div>
        
        {/* Small floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-60"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float-particle ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          ></div>
        ))}
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent animate-gradient-shift"></div>
      </div>

      <div className={`relative max-w-md w-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 text-center transform transition-all duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        {/* Floating animation for main icon */}
        <div className="mb-8 animate-float">
          <div className="w-28 h-28 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl transform transition-all duration-500 hover:rotate-12 hover:scale-110 relative overflow-hidden">
            <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
            <GraduationCap className="w-16 h-16 text-white drop-shadow-lg relative z-10" />
            <div className="absolute -top-1 -right-1">
              <Star className="w-6 h-6 text-yellow-300 animate-ping" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3 animate-fade-in">
            Welcome to CourseHub
          </h1>
          <p className="text-gray-600 text-lg animate-fade-in animation-delay-300">
            Your gateway to knowledge and skills
          </p>
        </div>
        
        {/* Animated book icon with sparkles */}
        <div className="mb-10 relative animate-bounce-slow">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transform transition-all duration-300 hover:rotate-6">
              <BookOpen className="w-14 h-14 text-white drop-shadow-lg" />
            </div>
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-spin-slow" />
            <Sparkles className="absolute -bottom-2 -left-2 w-5 h-5 text-yellow-400 animate-spin-slow animation-delay-1000" />
            <Zap className="absolute top-0 left-0 w-4 h-4 text-blue-400 animate-pulse" />
            <Heart className="absolute bottom-0 right-0 w-4 h-4 text-pink-400 animate-pulse animation-delay-500" />
          </div>
          <p className="text-gray-700 text-base mb-6 animate-fade-in animation-delay-600">
            Discover amazing courses on various topics and enhance your skills today!
          </p>
        </div>
        
        {/* Enhanced button with hover effects */}
        <Button 
          onClick={handleManualRedirect}
          className="w-full h-14 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 flex items-center justify-center space-x-3 group relative overflow-hidden"
        >
          <span className="relative z-10">Explore Courses</span>
          <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </Button>

        {/* Progress bar for auto-redirect */}
        <div className="mt-8">
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2 animate-pulse">
            Redirecting in {Math.ceil((100 - progress) / 33.3)}s...
          </p>
        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          33% { transform: translateY(-20px) translateX(10px) rotate(1deg); }
          66% { transform: translateY(10px) translateX(-10px) rotate(-1deg); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          33% { transform: translateY(-30px) translateX(-15px) rotate(-2deg); }
          66% { transform: translateY(15px) translateX(15px) rotate(2deg); }
        }
        
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          33% { transform: translateY(-40px) translateX(20px) rotate(3deg); }
          66% { transform: translateY(20px) translateX(-20px) rotate(-3deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes gradient-shift {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
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
        
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 15s ease-in-out infinite;
        }
        
        .animate-float-fast {
          animation: float-fast 10s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 5s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-gradient-shift {
          animation: gradient-shift 8s linear infinite;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}