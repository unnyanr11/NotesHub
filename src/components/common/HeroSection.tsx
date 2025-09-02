/**
 * Reusable Hero Section component for consistent hero sections
 */
import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen, FileText, Users, Star, TrendingUp } from 'lucide-react'

interface HeroSectionProps {
  title: string
  subtitle: string
  description: string
  primaryButtonText?: string
  primaryButtonLink?: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
  theme?: 'courses' | 'about' | 'contact'
  stats?: Array<{
    icon: any
    value: string
    label: string
    color: string
  }>
  children?: ReactNode
}

export default function HeroSection({
  title,
  subtitle,
  description,
  primaryButtonText = 'Explore Now',
  primaryButtonLink = '#',
  secondaryButtonText,
  secondaryButtonLink,
  theme = 'courses',
  stats,
  children
}: HeroSectionProps) {
  // Theme-based gradient colors
  const themeGradients = {
    courses: 'from-blue-600 via-indigo-600 to-purple-600',
    notes: 'from-purple-600 via-pink-600 to-rose-600',
    about: 'from-green-600 via-teal-600 to-cyan-600',
    contact: 'from-orange-600 via-red-600 to-pink-600'
  }

  // Theme-based icons
  const themeIcons = {
    courses: BookOpen,
    notes: FileText,
    about: Users,
    contact: TrendingUp
  }

  const ThemeIcon = themeIcons[theme]
  const gradient = themeGradients[theme]

  return (
    <section className={`relative bg-gradient-to-r ${gradient} text-white py-20 overflow-hidden`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/30 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-white rounded-full opacity-60"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float-particle ${4 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="transform transition-all duration-1000 translate-y-0 opacity-100">
          {/* Animated Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-bounce">
                <ThemeIcon className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping"></div>
            </div>
          </div>

          {/* Title and Subtitle */}
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl md:text-2xl mb-6 text-blue-100">
              {subtitle}
            </p>
          )}
          
          {/* Description */}
          <p className="text-lg text-blue-100 max-w-3xl mx-auto mb-8">
            {description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={() => window.location.href = primaryButtonLink}
              className="bg-white text-gray-800 hover:bg-gray-100 font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {primaryButtonText}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            {secondaryButtonText && secondaryButtonLink && (
              <Button 
                variant="outline"
                onClick={() => window.location.href = secondaryButtonLink}
                className="border-white text-white hover:bg-white hover:text-gray-800 font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                {secondaryButtonText}
              </Button>
            )}
          </div>

          {/* Stats */}
          {stats && (
            <div className="flex flex-wrap justify-center gap-6 animate-fade-in-up animation-delay-300">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 transform hover:scale-105 transition-all duration-300">
                  <stat.icon className={`w-5 h-5 ${stat.color} animate-pulse`} />
                  <span className="text-sm font-medium">{stat.value}</span>
                  <span className="text-sm">{stat.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Additional Content */}
          {children}
        </div>
      </div>

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
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  )
}