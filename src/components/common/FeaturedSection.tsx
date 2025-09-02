/**
 * Reusable Featured Section component for highlighting premium content
 */
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { IndianRupee, Zap } from 'lucide-react'
import { Product } from './ProductCard'

interface FeaturedSectionProps {
  products: Product[]
  type: 'course' | 'note'
  onBuyNow: (productId: string) => void
  title?: string
}

export default function FeaturedSection({ 
  products, 
  type, 
  onBuyNow, 
  title 
}: FeaturedSectionProps) {
  const themeColors = type === 'course' 
    ? {
        bg: 'from-yellow-50 to-orange-50',
        badge: 'bg-yellow-500 text-white hover:bg-yellow-600',
        button: 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600',
        title: 'from-orange-600 to-red-600'
      }
    : {
        bg: 'from-purple-50 to-pink-50',
        badge: 'bg-yellow-500 text-white hover:bg-yellow-600',
        button: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
        title: 'from-purple-600 to-pink-600'
      }

  const getDiscountedPrice = (product: Product) => {
    if (product.discount) {
      return Math.round(product.price * (1 - product.discount / 100))
    }
    return product.price
  }

  return (
    <section className={`py-12 bg-gradient-to-r ${themeColors.bg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h3 className={`text-3xl font-bold mb-4 bg-gradient-to-r ${themeColors.title} bg-clip-text text-transparent flex items-center justify-center`}>
            <Zap className="w-8 h-8 mr-2 text-yellow-500" />
            {title || (type === 'course' ? 'Featured Courses' : 'Featured Notes')}
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="transform hover:scale-105 transition-all duration-300">
              <Card className="overflow-hidden h-full bg-white/90 backdrop-blur-sm border-2 shadow-xl hover:shadow-2xl">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <Badge className={themeColors.badge}>
                      <Zap className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-bold text-lg mb-2">{product.title}</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <IndianRupee className="w-4 h-4 text-green-600" />
                      <span className="text-xl font-bold text-green-600">
                        {getDiscountedPrice(product).toLocaleString()}
                      </span>
                      {product.discount && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          {product.price.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <Button 
                      onClick={() => onBuyNow(product.id)}
                      size="sm"
                      className={themeColors.button}
                    >
                      Buy Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}