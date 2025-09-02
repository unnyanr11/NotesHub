/**
 * Courses.tsx
 * - Purpose: List and filter notes for purchase.
 * - Adds a mobile hamburger menu for the header on small screens.
 */

import { Link } from 'react-router';
import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Clock, Users, Star, IndianRupee, TrendingUp, Award, BookOpen, Search, Filter, X, Heart, Eye, Zap, User, Lightbulb } from 'lucide-react'

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

/**
 * Courses grid with search and filters.
 * Clicking Buy Now persists the selected product in localStorage and navigates to checkout.
 * Mobile: header navigation collapses into a hamburger menu.
 */
export default function Courses() {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [hoveredCourse, setHoveredCourse] = useState<string | null>(null)
  const [wishlist, setWishlist] = useState<string[]>([])

  // Mobile menu state for this page's header
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeMobile = useCallback(() => setMobileOpen(false), [])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Close menu on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMobile()
    }
    if (mobileOpen) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileOpen, closeMobile])

  // Enhanced course data with more variety
  const courses: Course[] = [
    {
      id: '1',
      title: 'Complete JavaScript Notes for Beginners',
      description: 'Comprehensive JavaScript notes covering all fundamental concepts, syntax, and practical examples. Perfect for beginners and interview preparation.',
      price: 299,
      duration: 'Self-paced',
      students: 8420,
      rating: 4.7,
      category: 'Programming',
      image: 'https://pub-cdn.sider.ai/u/U0Z6HZJGK2R/web-coder/68aee64d7b28bae49830d951/resource/4e70453d-fad9-41ba-ab71-8ed7de2c30a3.jpg',
      tags: ['JavaScript', 'ES6', 'DOM', 'Async', 'Interview'],
      level: 'Beginner',
      featured: true,
      pages: 150,
      format: 'PDF',
      subject: 'Computer Science',
      downloadCount: 3240,
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      title: 'Data Structures & Algorithms Handbook',
      description: 'Detailed notes on data structures, algorithms, and problem-solving techniques. Includes diagrams, examples, and practice problems.',
      price: 499,
      duration: 'Self-paced',
      students: 5634,
      rating: 4.9,
      category: 'Computer Science',
      image: 'https://pub-cdn.sider.ai/u/U0Z6HZJGK2R/web-coder/68aee64d7b28bae49830d951/resource/cff95f0b-01c3-4ca5-8e7c-c79b019e4478.jpg',
      tags: ['Algorithms', 'Data Structures', 'Complexity', 'Trees'],
      level: 'Intermediate',
      featured: true,
      pages: 200,
      format: 'PDF',
      subject: 'Computer Science',
      downloadCount: 2150,
      lastUpdated: '2024-01-20'
    },
    {
      id: '3',
      title: 'Business Management Study Guide',
      description: 'Complete study guide for business management covering marketing, finance, operations, and strategic planning. Includes case studies and examples.',
      price: 399,
      duration: 'Self-paced',
      students: 4232,
      rating: 4.6,
      category: 'Business',
      image: 'https://pub-cdn.sider.ai/u/U0Z6HZJGK2R/web-coder/68aee64d7b28bae49830d951/resource/cb01b4b7-e48f-4b21-9d9c-81a61e713966.jpg',
      tags: ['Management', 'Marketing', 'Finance', 'Strategy'],
      level: 'Beginner',
      pages: 120,
      format: 'DOC',
      subject: 'Business Studies',
      downloadCount: 1870,
      lastUpdated: '2024-01-10'
    },
    {
      id: '4',
      title: 'Physics Formula Sheet & Concepts',
      description: 'Essential physics formulas, concepts, and derivations for competitive exams. Well-organized and easy to understand.',
      price: 199,
      duration: 'Self-paced',
      students: 6421,
      rating: 4.8,
      category: 'Science',
      image: 'https://pub-cdn.sider.ai/u/U0Z6HZJGK2R/web-coder/68aee64d7b28bae49830d951/resource/daac2c0f-d147-4ba3-9c08-785d77b59867.jpg',
      tags: ['Physics', 'Formulas', 'Mechanics', 'Thermodynamics'],
      level: 'Intermediate',
      pages: 80,
      format: 'PDF',
      subject: 'Physics',
      downloadCount: 4520,
      lastUpdated: '2024-01-18'
    },
    {
      id: '5',
      title: 'Advanced React Development Notes',
      description: 'In-depth React notes covering hooks, context API, performance optimization, and best practices. Includes project examples.',
      price: 599,
      duration: 'Self-paced',
      students: 3210,
      rating: 4.9,
      category: 'Programming',
      image: 'https://pub-cdn.sider.ai/u/U0Z6HZJGK2R/web-coder/68aee64d7b28bae49830d951/resource/1ae53984-4f4e-453d-8edc-d37d276715fd.jpg',
      tags: ['React', 'Hooks', 'Redux', 'Performance'],
      level: 'Advanced',
      pages: 180,
      format: 'PDF',
      subject: 'Computer Science',
      downloadCount: 1250,
      lastUpdated: '2024-01-22'
    },
    {
      id: '6',
      title: 'Mathematics Quick Revision Notes',
      description: 'Quick revision notes for mathematics covering calculus, algebra, geometry, and statistics. Perfect for exam preparation.',
      price: 249,
      duration: 'Self-paced',
      students: 7567,
      rating: 4.7,
      category: 'Mathematics',
      image: 'https://pub-cdn.sider.ai/u/U0Z6HZJGK2R/web-coder/68aee64d7b28bae49830d951/resource/ef4a4975-10c9-48ef-ace4-718f90896038.jpg',
      tags: ['Calculus', 'Algebra', 'Geometry', 'Statistics'],
      level: 'Beginner',
      pages: 100,
      format: 'PDF',
      subject: 'Mathematics',
      downloadCount: 3890,
      lastUpdated: '2024-01-12'
    },
    {
      id: '7',
      title: 'Digital Marketing Strategy Guide',
      description: 'Comprehensive digital marketing notes covering SEO, social media, content marketing, and analytics. Includes real-world examples.',
      price: 449,
      duration: 'Self-paced',
      students: 2890,
      rating: 4.5,
      category: 'Marketing',
      image: 'https://pub-cdn.sider.ai/u/U0Z6HZJGK2R/web-coder/68aee64d7b28bae49830d951/resource/eac7598a-44e4-44de-beb0-53d5a0c38368.jpg',
      tags: ['SEO', 'Social Media', 'Content', 'Analytics'],
      level: 'Intermediate',
      pages: 140,
      format: 'PPT',
      subject: 'Business Studies',
      downloadCount: 980,
      lastUpdated: '2024-01-16'
    },
    {
      id: '8',
      title: 'Machine Learning Fundamentals',
      description: 'Introduction to machine learning concepts, algorithms, and applications. Includes Python examples and datasets.',
      price: 699,
      duration: 'Self-paced',
      students: 1567,
      rating: 4.8,
      category: 'Computer Science',
      image: 'https://pub-cdn.sider.ai/u/U0Z6HZJGK2R/web-coder/68aee64d7b28bae49830d951/resource/f0ab8f20-c99e-41dc-a15a-021f20311949.jpg',
      tags: ['Machine Learning', 'Python', 'Algorithms', 'Data Science'],
      level: 'Advanced',
      featured: true,
      pages: 250,
      format: 'PDF',
      subject: 'Computer Science',
      downloadCount: 670,
      lastUpdated: '2024-01-25'
    }
  ]

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(courses.map(course => course.category)))]

  // Use courses directly without sorting
  const displayCourses = courses

  // Filter courses based on search and category
  const filteredCourses = displayCourses.filter(course => {
    const matchesSearch = searchTerm === '' ||
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  /**
   * Persist the selected course to localStorage and navigate to checkout.
   * This allows the Checkout page to automatically load product details.
   */
  const handleBuyNow = (courseId: string) => {
    const course = courses.find(c => c.id === courseId)
    try {
      if (course) {
        localStorage.setItem('selectedProduct', JSON.stringify({ ...course, type: 'course' }))
      }
    } catch {
      // Ignore storage errors (private mode, quota, etc.)
    }
    navigate(`/checkout?courseId=${courseId}`)
  }

  const toggleWishlist = (courseId: string) => {
    setWishlist(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    )
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('All')
  }

  const getDiscountedPrice = (course: Course) => {
    return course.price
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Animated Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg border-b sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
                <BookOpen className="w-7 h-7 text-white drop-shadow-lg" />
              </div>
              <h1 className="ml-3 text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                NotesHub
              </h1>
            </div>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/courses" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1 transition-colors duration-300">Notes</Link>
              <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium">About</Link>
              <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium">Contact</Link>
            </nav>

            {/* Mobile hamburger */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen(v => !v)}
              >
                {mobileOpen ? (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Backdrop */}
        {mobileOpen && (
          <div className="md:hidden fixed inset-0 bg-black/30 z-40" onClick={closeMobile} aria-hidden="true" />
        )}

        {/* Mobile slide-down menu */}
        <div
          className={`md:hidden fixed top-[72px] inset-x-0 z-50 transition-all duration-200 ${
            mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
        >
          <div className="mx-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-gray-200 p-4 space-y-2">
            <Link
              to="/courses"
              onClick={closeMobile}
              className="block w-full px-4 py-3 rounded-lg text-gray-800 hover:bg-gray-100 font-medium"
            >
              Notes
            </Link>
            <Link
              to="/about"
              onClick={closeMobile}
              className="block w-full px-4 py-3 rounded-lg text-gray-800 hover:bg-gray-100 font-medium"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={closeMobile}
              className="block w-full px-4 py-3 rounded-lg text-gray-800 hover:bg-gray-100 font-medium"
            >
              Contact
            </Link>
          </div>
        </div>
      </header>

      {/* Animated Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white py-20 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10"></div>
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
          {/* Floating particles */}
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
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Lightbulb className="w-16 h-16 text-yellow-300 animate-bounce" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping"></div>
              </div>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent animate-gradient-shift">
              Premium Study Notes
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto animate-fade-in-up">
              Access expertly crafted study materials and notes to excel in your academics
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up animation-delay-300"></div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-white/50 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search Bar */}
            <div className="relative flex-1 w-full">
              <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all duration-300 ${isSearchFocused ? 'text-blue-500' : 'text-gray-400'}`}>
                <Search className="w-5 h-5" />
              </div>
              <Input
                type="text"
                placeholder="Search courses or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={`pl-12 pr-12 py-4 text-lg border-2 rounded-xl transition-all duration-300 ${
                  isSearchFocused
                    ? 'border-blue-500 shadow-lg shadow-blue-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-4 w-full lg:w-auto">
              <div className="flex items-center space-x-2 text-gray-600">
                <Filter className="w-5 h-5" />
                <span className="font-medium">Filter:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {(searchTerm || selectedCategory !== 'All') && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Clear All</span>
              </button>
            )}
          </div>

          {/* Results Count */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 animate-fade-in">
              Showing <span className="font-bold text-blue-600">{filteredCourses.length}</span> of <span className="font-bold">{courses.length}</span> courses
              {(searchTerm || selectedCategory !== 'All') && (
                <span className="text-sm text-gray-500 ml-2">
                  {searchTerm && ` matching "${searchTerm}"`}
                  {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                </span>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      {filteredCourses.some(course => course.featured) && (
        <section className="py-12 bg-gradient-to-r from-yellow-50 to-orange-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent flex items-center justify-center">
                <Zap className="w-8 h-8 mr-2 text-yellow-500" />
                Featured Notes
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.filter(course => course.featured).map((course) => (
                <div key={course.id} className="transform hover:scale-105 transition-all duration-300">
                  <Card className="overflow-hidden h-full bg-white/90 backdrop-blur-sm border-2 border-yellow-200 shadow-xl hover:shadow-2xl">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">
                          <Zap className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-bold text-lg mb-2">{course.title}</h4>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <IndianRupee className="w-4 h-4 text-green-600" />
                          <span className="text-xl font-bold text-green-600">
                            {getDiscountedPrice(course).toLocaleString()}
                          </span>
                          {course.discount && (
                            <span className="text-sm text-gray-500 line-through ml-2">
                              {course.price.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <Button
                          onClick={() => handleBuyNow(course.id)}
                          size="sm"
                          className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
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
      )}

      {/* Animated Courses Grid */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent">
              {selectedCategory === 'All' ? 'All Courses' : selectedCategory + ' Courses'}
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover our most sought-after courses designed by industry experts
            </p>
          </div>

          {filteredCourses.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No notes found</h3>
              <p className="text-gray-600 mb-8">Try adjusting your search or filter criteria</p>
              <button
                onClick={clearFilters}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredCourses.map((course, index) => (
                <div
                  key={course.id}
                  className={`transform transition-all duration-700 hover:scale-105 hover:z-10 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setHoveredCourse(course.id)}
                  onMouseLeave={() => setHoveredCourse(null)}
                >
                  <Card className="overflow-hidden group h-full bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 relative">
                    {/* Animated border effect */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 transition-opacity duration-300 ${hoveredCourse === course.id ? 'opacity-20' : ''}`}></div>

                    {/* Course Image with overlay */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                      {/* Floating badges */}
                      <div className="absolute top-4 left-4 space-y-2">
                        <Badge className="bg-white/90 text-gray-800 hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-lg">
                          {course.category}
                        </Badge>
                        {course.level && (
                          <Badge className={`${
                            course.level === 'Beginner' ? 'bg-green-500/90 text-white' :
                            course.level === 'Intermediate' ? 'bg-yellow-500/90 text-white' :
                            'bg-red-500/90 text-white'
                          } transition-all duration-300 transform hover:scale-105 shadow-lg`}>
                            {course.level}
                          </Badge>
                        )}
                      </div>

                      {/* Wishlist button */}
                      <button
                        onClick={() => toggleWishlist(course.id)}
                        className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
                      >
                        <Heart
                          className={`w-5 h-5 transition-colors duration-300 ${
                            wishlist.includes(course.id) ? 'text-red-500 fill-current' : 'text-gray-600'
                          }`}
                        />
                      </button>

                      {/* Rating badge with animation */}
                      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1 transform transition-all duration-300 hover:scale-105 shadow-lg">
                        <Star className="w-4 h-4 text-yellow-400 fill-current animate-pulse" />
                        <span className="text-sm font-semibold text-gray-800">{course.rating}</span>
                      </div>
                    </div>

                    <CardHeader className="pb-4 relative z-10">
                      <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                        {course.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed line-clamp-3">
                        {course.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0 relative z-10">
                      {/* Tags */}
                      {course.tags && course.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {course.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full transition-all duration-300 hover:bg-blue-200 hover:scale-105"
                            >
                              {tag}
                            </span>
                          ))}
                          {course.tags.length > 3 && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              +{course.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                          <Clock className="w-4 h-4 mr-2 text-blue-500 animate-pulse" />
                          <span className="font-medium">Duration:</span>
                          <span className="ml-2">{course.duration}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                          <Users className="w-4 h-4 mr-2 text-green-500 animate-pulse animation-delay-500" />
                          <span className="font-medium">Students:</span>
                          <span className="ml-2">{course.students.toLocaleString()} enrolled</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <IndianRupee className="w-6 h-6 text-green-600 animate-pulse animation-delay-1000" />
                          <div>
                            <span className="text-2xl font-bold text-green-600">
                              {getDiscountedPrice(course).toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleBuyNow(course.id)}
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 group relative overflow-hidden"
                        >
                          <span className="relative z-10">Buy Now</span>
                          <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Animated Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-20"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center transform transition-all duration-500 hover:rotate-12">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
          <p className="text-lg mb-4">&copy; 2024 StudyNotes Hub. All rights reserved.</p>
          <p className="text-gray-400 text-sm">Empowering learners worldwide with quality study materials</p>
        </div>
      </footer>

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
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
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
        
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 6s ease infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}
