/**
 * Custom hook for authentication state management
 */
import { useState, useEffect } from 'react'
import { supabase, getCurrentUser, getSession, onAuthStateChange } from '@/lib/supabase'

interface User {
  id: string
  email: string
  full_name?: string
  phone?: string
  avatar_url?: string
}

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    // Check initial auth state
    const checkAuth = async () => {
      try {
        const session = await getSession()
        if (session?.user) {
          const user = session.user
          setAuthState({
            user: {
              id: user.id,
              email: user.email!,
              full_name: user.user_metadata?.full_name,
              phone: user.user_metadata?.phone,
              avatar_url: user.user_metadata?.avatar_url,
            },
            loading: false,
            error: null,
          })
        } else {
          setAuthState(prev => ({ ...prev, loading: false }))
        }
      } catch (error) {
        setAuthState({
          user: null,
          loading: false,
          error: error instanceof Error ? error.message : 'Authentication error',
        })
      }
    }

    checkAuth()

    // Listen for auth state changes
    const { data: { subscription } } = onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const user = session.user
        setAuthState({
          user: {
            id: user.id,
            email: user.email!,
            full_name: user.user_metadata?.full_name,
            phone: user.user_metadata?.phone,
            avatar_url: user.user_metadata?.avatar_url,
          },
          loading: false,
          error: null,
        })
      } else if (event === 'SIGNED_OUT') {
        setAuthState({
          user: null,
          loading: false,
          error: null,
        })
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }))
      
      const { data } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (data.user) {
        setAuthState({
          user: {
            id: data.user.id,
            email: data.user.email!,
            full_name: data.user.user_metadata?.full_name,
            phone: data.user.user_metadata?.phone,
            avatar_url: data.user.user_metadata?.avatar_url,
          },
          loading: false,
          error: null,
        })
      }
    } catch (error) {
      setAuthState({
        user: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      })
      throw error
    }
  }

  const signUp = async (email: string, password: string, fullName: string, phone?: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }))
      
      const { data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone: phone || null,
          },
        },
      })
      
      if (data.user) {
        setAuthState({
          user: {
            id: data.user.id,
            email: data.user.email!,
            full_name: fullName,
            phone: phone,
          },
          loading: false,
          error: null,
        })
      }
    } catch (error) {
      setAuthState({
        user: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Registration failed',
      })
      throw error
    }
  }

  const signOut = async () => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }))
      await supabase.auth.signOut()
      setAuthState({
        user: null,
        loading: false,
        error: null,
      })
    } catch (error) {
      setAuthState({
        user: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Logout failed',
      })
      throw error
    }
  }

  const resetPassword = async (email: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }))
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      setAuthState(prev => ({ ...prev, loading: false }))
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Password reset failed',
      }))
      throw error
    }
  }

  return {
    ...authState,
    signIn,
    signUp,
    signOut,
    resetPassword,
  }
}
