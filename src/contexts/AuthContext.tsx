'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/utils/supabase'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAdmin: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAdmin: false,
  signOut: async () => {},
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user ?? null)
        setIsAdmin(session?.user?.user_metadata?.role === 'admin' ?? false)
      } catch (error) {
        console.error('Error getting initial session:', error)
      } finally {
        setIsLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setIsAdmin(session?.user?.user_metadata?.role === 'admin' ?? false)
      setIsLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      setIsAdmin(false)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const value = {
    user,
    isLoading,
    isAdmin,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  )
}

// Custom hook for protected routes
export function useProtectedRoute(adminOnly = false) {
  const { user, isAdmin, isLoading } = useAuth()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        window.location.href = '/login'
      } else if (adminOnly && !isAdmin) {
        window.location.href = '/dashboard'
      } else {
        setIsAuthorized(true)
      }
    }
  }, [user, isAdmin, isLoading, adminOnly])

  return { isAuthorized, isLoading }
}

// HOC for protected pages
export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  adminOnly = false
) {
  return function WithAuthComponent(props: P) {
    const { isAuthorized, isLoading } = useProtectedRoute(adminOnly)

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
        </div>
      )
    }

    if (!isAuthorized) {
      return null
    }

    return <WrappedComponent {...props} />
  }
}
