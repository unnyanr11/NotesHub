/**
 * Reusable Search and Filter Section component
 */
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Filter, X } from 'lucide-react'

interface SearchFilterSectionProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  categories: string[]
  selectedCategory: string
  onCategoryChange: (value: string) => void
  subjects?: string[]
  selectedSubject?: string
  onSubjectChange?: (value: string) => void
  totalItems: number
  filteredItems: number
  placeholder?: string
  theme?: 'courses' | 'notes'
}

export default function SearchFilterSection({
  searchTerm,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
  subjects,
  selectedSubject,
  onSubjectChange,
  totalItems,
  filteredItems,
  placeholder = "Search...",
  theme = 'courses'
}: SearchFilterSectionProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const themeColors = {
    courses: {
      focus: 'border-blue-500 shadow-lg shadow-blue-200',
      hover: 'border-gray-300 hover:border-blue-400',
      active: 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg',
      inactive: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    },
    notes: {
      focus: 'border-purple-500 shadow-lg shadow-purple-200',
      hover: 'border-gray-300 hover:border-purple-400',
      active: 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg',
      inactive: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }
  }

  const colors = themeColors[theme]

  const clearFilters = () => {
    onSearchChange('')
    onCategoryChange('All')
    if (onSubjectChange && selectedSubject) {
      onSubjectChange('All')
    }
  }

  const hasActiveFilters = searchTerm || selectedCategory !== 'All' || (selectedSubject && selectedSubject !== 'All')

  return (
    <section className="py-12 bg-white/50 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="relative flex-1 w-full mb-8">
          <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all duration-300 ${isSearchFocused ? 'text-blue-500' : 'text-gray-400'}`}>
            <Search className="w-5 h-5" />
          </div>
          <Input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className={`pl-12 pr-12 py-4 text-lg border-2 rounded-xl transition-all duration-300 ${
              isSearchFocused ? colors.focus : colors.hover
            }`}
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-300"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Filter Section */}
        <div className="space-y-6">
          {/* Category Filter */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <Filter className="w-5 h-5" />
              <span className="font-medium">Category:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category
                      ? colors.active
                      : colors.inactive
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Subject Filter (if provided) */}
          {subjects && onSubjectChange && selectedSubject !== undefined && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span className="font-medium">Subject:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {subjects.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => onSubjectChange(subject)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                      selectedSubject === subject
                        ? colors.active
                        : colors.inactive
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="flex justify-center">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Clear All Filters</span>
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 animate-fade-in">
            Showing <span className={`font-bold ${theme === 'courses' ? 'text-blue-600' : 'text-purple-600'}`}>
              {filteredItems}
            </span> of <span className="font-bold">{totalItems}</span> {theme === 'courses' ? 'courses' : 'notes'}
            {(searchTerm || selectedCategory !== 'All' || (selectedSubject && selectedSubject !== 'All')) && (
              <span className="text-sm text-gray-500 ml-2">
                {searchTerm && ` matching "${searchTerm}"`}
                {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                {selectedSubject && selectedSubject !== 'All' && ` for ${selectedSubject}`}
              </span>
            )}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  )
}