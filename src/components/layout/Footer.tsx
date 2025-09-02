/**
 * Reusable Footer component for consistent footer across all pages
 */
import { Link } from 'react-router-dom'; // corrected import from 'react-router' to 'react-router-dom'
import { BookOpen, FileText, Mail, Phone, MapPin, Heart } from 'lucide-react';

export interface FooterProps {  // Exporting FooterProps
  theme?: 'light' | 'dark';
}

export default function Footer({ theme = 'light' }: FooterProps) {
  const bgColor = theme === 'dark' ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-gray-100 to-gray-200';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-800';
  const linkColor = theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800';

  return (
    <footer className={`${bgColor} ${textColor} py-12 mt-20 relative overflow-hidden`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/20 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/20 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              NotesHub
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Empowering learners worldwide with quality education and comprehensive study materials.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className={`text-sm ${linkColor} transition-colors duration-300 flex items-center space-x-1`}>
                  <BookOpen className="w-4 h-4" />
                  <span>Courses</span>
                </Link>
              </li>
              <li>
                <Link to="/notes" className={`text-sm ${linkColor} transition-colors duration-300 flex items-center space-x-1`}>
                  <FileText className="w-4 h-4" />
                  <span>Study Notes</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className={`text-sm ${linkColor} transition-colors duration-300`}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className={`text-sm ${linkColor} transition-colors duration-300`}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/courses?category=Web Development" className={`text-sm ${linkColor} transition-colors duration-300`}>
                  Web Development
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Data Science" className={`text-sm ${linkColor} transition-colors duration-300`}>
                  Data Science
                </Link>
              </li>
              <li>
                <Link to="/notes?category=Programming" className={`text-sm ${linkColor} transition-colors duration-300`}>
                  Programming Notes
                </Link>
              </li>
              <li>
                <Link to="/notes?category=Mathematics" className={`text-sm ${linkColor} transition-colors duration-300`}>
                  Mathematics
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-500" />
                <span className="text-sm">support@coursehub.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-500" />
                <span className="text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-red-500" />
                <span className="text-sm">Mumbai, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-300/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              &copy; 2024 NotesHub. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Made with
              </span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                for learners worldwide
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}