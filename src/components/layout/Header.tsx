/**
 * Header.tsx
 * - Purpose: Reusable global header with responsive navigation.
 * - Adds an accessible mobile hamburger menu: collapses links on small screens into a slide-down panel.
 */

import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { useAuth } from'@/hooks/useAuth' 
import { BookOpen, FileText, User, LogOut } from 'lucide-react'

interface HeaderProps {
  /** Optional page title displayed under brand */
  title?: string
  /** Show a back button on the left */
  showBackButton?: boolean
  /** Custom back handler, defaults to history back */
  onBackClick?: () => void
}

/**
 * Header
 * - Provides branding, navigation links, and user actions.
 * - Mobile: hamburger toggles a slide-down menu with nav options.
 */
export default function Header({ title, showBackButton = false, onBackClick }: HeaderProps) {
  const navigate = useNavigate()
  const { user, loading, signOut } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /** Closes mobile menu */
  const closeMobile = useCallback(() => setMobileOpen(false), [])

  /** Close on Escape key when open */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMobile()
    }
    if (mobileOpen) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileOpen, closeMobile])

  const handleLogout = async () => {
    try {
      await signOut()
      closeMobile()
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }

  const handleAuth = () => {
    // This will be handled by the AuthModal in individual pages
    console.log('Open auth modal')
    closeMobile()
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'
          : 'bg-white/80 backdrop-blur-sm border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            {/* Back Button */}
            {showBackButton && (
              <Button
                variant="ghost"
                onClick={onBackClick || (() => navigate(-1))}
                className="transform transition-all duration-300 hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </Button>
            )}

            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center transform transition-all duration-300 hover:rotate-12 hover:scale-110">
                  <BookOpen className="w-6 h-6 text-white drop-shadow-lg" />
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center transform transition-all duration-300 hover:rotate-12 hover:scale-110">
                  <FileText className="w-6 h-6 text-white drop-shadow-lg" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  NotesHub
                </h1>
                {title && <p className="text-sm text-gray-600">{title}</p>}
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/courses"
              className="text-gray-600 hover:text-purple-600 transition-colors duration-300 font-medium flex items-center space-x-1"
            >
              <BookOpen className="w-4 h-4" />
              <span>Notes</span>
            </Link>

            <Link
              to="/about"
              className="text-gray-600 hover:text-gray-600 transition-colors duration-300 font-medium flex items-center space-x-1"
            >
              <FileText className="w-4 h-4" />
              <span>About</span>
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-gray-600 transition-colors duration-300 font-medium flex items-center space-x-1"
            >
              <FileText className="w-4 h-4" />
              <span>Contact</span>
            </Link>

            {/* Authentication */}
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium text-sm hidden lg:block">{user.email}</span>
                </div>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                  disabled={loading}
                >
                  <LogOut className="w-4 h-4" />
                  <span>{loading ? 'Logging out...' : 'Logout'}</span>
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleAuth}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium"
              >
                Sign In
              </Button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? (
                // Close icon
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger icon
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Backdrop for mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/30 z-40"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      {/* Mobile slide-down menu */}
      <div
        className={`md:hidden fixed top-16 inset-x-0 z-50 transition-all duration-200 ${
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

          <div className="pt-2 border-t border-gray-200 mt-2">
            {user ? (
              <Button
                variant="outline"
                onClick={handleLogout}
                className="w-full justify-center border-gray-300 text-gray-700 hover:bg-gray-50"
                disabled={loading}
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span>{loading ? 'Logging out...' : 'Logout'}</span>
              </Button>
            ) : (
              <Button
                onClick={handleAuth}
                className="w-full justify-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
