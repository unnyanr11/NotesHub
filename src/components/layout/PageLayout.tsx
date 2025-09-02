/**
 * Reusable Page Layout component for consistent page structure
 */
import { ReactNode } from 'react'
import Header from './Header'
import Footer, { FooterProps } from './Footer'

interface PageLayoutProps {
  children: ReactNode
  title?: string
  showBackButton?: boolean
  onBackClick?: () => void
  footerTheme?: FooterProps['theme']
  className?: string
}

export default function PageLayout({ 
  children, 
  title, 
  showBackButton = false, 
  onBackClick, 
  footerTheme = 'light',
  className = '' 
}: PageLayoutProps) {
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      <Header 
        title={title}
        showBackButton={showBackButton}
        onBackClick={onBackClick}
      />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <Footer theme={footerTheme} />
    </div>
  )
}