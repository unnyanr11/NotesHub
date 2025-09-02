/**
 * Reusable Empty State component for when no results are found
 */
import { Button } from '@/components/ui/button'
import { Search, RefreshCw } from 'lucide-react'

interface EmptyStateProps {
  title: string
  description: string
  actionButtonText?: string
  onActionClick?: () => void
  theme?: 'courses' | 'notes'
}

export default function EmptyState({
  title,
  description,
  actionButtonText = 'Clear Filters',
  onActionClick,
  theme = 'courses'
}: EmptyStateProps) {
  const themeColors = {
    courses: {
      button: 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700',
      icon: 'text-blue-400'
    },
    notes: {
      button: 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700',
      icon: 'text-purple-400'
    }
  }

  const colors = themeColors[theme]

  return (
    <div className="text-center py-20">
      <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
        <Search className={`w-12 h-12 ${colors.icon}`} />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">{description}</p>
      {onActionClick && (
        <Button
          onClick={onActionClick}
          className={`${colors.button} text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105`}
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          {actionButtonText}
        </Button>
      )}
    </div>
  )
}