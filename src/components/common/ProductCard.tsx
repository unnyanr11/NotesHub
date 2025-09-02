/**
 * Reusable Product Card component for both Courses and Notes
 */
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Heart, 
  Star, 
  Clock, 
  Users, 
  Eye, 
  IndianRupee, 
  BookOpen, 
  FileText, 
  Download,
  Calendar,
  Tag
} from 'lucide-react'

export interface Product {
  id: string
  title: string
  description: string
  price: number
  discount?: number
  category: string
  instructor: string
  image?: string
  tags?: string[]
  level?: 'Beginner' | 'Intermediate' | 'Advanced'
  featured?: boolean
  rating: number
  // Course specific
  duration?: string
  students?: number
  // Notes specific
  pages?: number
  format?: 'PDF' | 'DOC' | 'PPT' | 'Video'
  subject?: string
  downloadCount?: number
  lastUpdated?: string
}

interface ProductCardProps {
  product: Product
  type: 'course' | 'note'
  onBuyNow: (productId: string) => void
  onToggleWishlist: (productId: string) => void
  isInWishlist: boolean
  index?: number
  isVisible?: boolean
}

export default function ProductCard({
  product,
  type,
  onBuyNow,
  onToggleWishlist,
  isInWishlist,
  index = 0,
  isVisible = true
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const themeColors = type === 'course' 
    ? {
        primary: 'blue',
        secondary: 'indigo',
        gradient: 'from-blue-500 to-indigo-600',
        hoverGradient: 'from-blue-600 to-indigo-700'
      }
    : {
        primary: 'purple',
        secondary: 'pink',
        gradient: 'from-purple-500 to-pink-600',
        hoverGradient: 'from-purple-600 to-pink-700'
      }

  const getDiscountedPrice = (product: Product) => {
    if (product.discount) {
      return Math.round(product.price * (1 - product.discount / 100))
    }
    return product.price
  }

  const getLevelColor = (level?: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-500/90 text-white'
      case 'Intermediate': return 'bg-yellow-500/90 text-white'
      case 'Advanced': return 'bg-red-500/90 text-white'
      default: return 'bg-gray-500/90 text-white'
    }
  }

  return (
    <div 
      className={`transform transition-all duration-700 hover:scale-105 hover:z-10 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden group h-full bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 relative">
        {/* Animated Border Effect */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${themeColors.gradient} opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-20' : ''}`}></div>
        
        {/* Product Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          
          {/* Floating Badges */}
          <div className="absolute top-4 left-4 space-y-2">
            <Badge className="bg-white/90 text-gray-800 hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-lg">
              {product.category}
            </Badge>
            {product.level && (
              <Badge className={`${getLevelColor(product.level)} transition-all duration-300 transform hover:scale-105 shadow-lg`}>
                {product.level}
              </Badge>
            )}
            {product.discount && (
              <Badge className="bg-red-500/90 text-white animate-pulse">
                {product.discount}% OFF
              </Badge>
            )}
          </div>

          {/* Type-specific Badge */}
          <div className="absolute top-4 right-4">
            <Badge className={`${
              type === 'course' 
                ? 'bg-blue-500/90 text-white hover:bg-blue-600' 
                : 'bg-purple-500/90 text-white hover:bg-purple-600'
            } transition-all duration-300 transform hover:scale-105 shadow-lg`}>
              {type === 'course' ? 'Notes' : product.format || 'Note'}
            </Badge>
          </div>
          
          {/* Wishlist Button */}
          <button
            onClick={() => onToggleWishlist(product.id)}
            className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <Heart 
              className={`w-5 h-5 transition-colors duration-300 ${
                isInWishlist ? 'text-red-500 fill-current' : 'text-gray-600'
              }`} 
            />
          </button>
          
          {/* Rating Badge */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1 transform transition-all duration-300 hover:scale-105 shadow-lg">
            <Star className="w-4 h-4 text-yellow-400 fill-current animate-pulse" />
            <span className="text-sm font-semibold text-gray-800">{product.rating}</span>
          </div>
        </div>
        
        <CardHeader className="pb-4 relative z-10">
          <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
            {product.title}
          </CardTitle>
          <CardDescription className="text-gray-600 leading-relaxed line-clamp-3">
            {product.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-0 relative z-10">
          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {product.tags.slice(0, 3).map((tag, tagIndex) => (
                <span 
                  key={tagIndex}
                  className={`text-xs ${
                    type === 'course' 
                      ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                      : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                  } px-2 py-1 rounded-full transition-all duration-300 hover:scale-105`}
                >
                  {tag}
                </span>
              ))}
              {product.tags.length > 3 && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  +{product.tags.length - 3}
                </span>
              )}
            </div>
          )}
          
          {/* Product Details */}
          <div className="space-y-3 mb-6">
            {/* Course-specific details */}
            {type === 'course' && product.duration && (
              <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                <Clock className="w-4 h-4 mr-2 text-blue-500 animate-pulse" />
                <span className="font-medium">Duration:</span>
                <span className="ml-2">{product.duration}</span>
              </div>
            )}
            
            {type === 'course' && product.students && (
              <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                <Users className="w-4 h-4 mr-2 text-green-500 animate-pulse animation-delay-500" />
                <span className="font-medium">Students:</span>
                <span className="ml-2">{product.students.toLocaleString()} enrolled</span>
              </div>
            )}

            {/* Notes-specific details */}
            {type === 'course' && product.pages && (
              <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                <FileText className="w-4 h-4 mr-2 text-purple-500 animate-pulse" />
                <span className="font-medium">Pages:</span>
                <span className="ml-2">{product.pages} pages</span>
              </div>
            )}

            {type === 'course' && product.downloadCount && (
              <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                <Download className="w-4 h-4 mr-2 text-green-500 animate-pulse animation-delay-500" />
                <span className="font-medium">Downloads:</span>
                <span className="ml-2">{product.downloadCount.toLocaleString()}</span>
              </div>
            )}

            {type === 'course' && product.lastUpdated && (
              <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                <span className="font-medium">Updated:</span>
                <span className="ml-2">{new Date(product.lastUpdated).toLocaleDateString()}</span>
              </div>
            )}

            {/* Common details */}
            <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
              <Eye className="w-4 h-4 mr-2 text-purple-500" />
              <span className="font-medium">{type === 'course' ? 'Instructor' : 'Subject'}:</span>
              <span className="ml-2 truncate">{type === 'course' ? product.instructor : product.subject}</span>
            </div>
          </div>
          
          {/* Price and Buy Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <IndianRupee className={`w-6 h-6 text-green-600 animate-pulse animation-delay-1000`} />
              <div>
                <span className={`text-2xl font-bold text-green-600`}>
                  {getDiscountedPrice(product).toLocaleString()}
                </span>
                {product.discount && (
                  <span className="text-sm text-gray-500 line-through ml-2">
                    {product.price.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
            <Button 
              onClick={() => onBuyNow(product.id)}
              className={`bg-gradient-to-r ${themeColors.gradient} hover:${themeColors.hoverGradient} text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 group relative overflow-hidden`}
            >
              <span className="relative z-10">Buy Now</span>
              <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}