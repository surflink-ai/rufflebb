import React from 'react'

interface LoadingSpinnerProps {
  fullScreen?: boolean
  size?: 'small' | 'medium' | 'large'
}

export default function LoadingSpinner({ 
  fullScreen = false,
  size = 'medium'
}: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'h-6 w-6 border-2',
    medium: 'h-12 w-12 border-2',
    large: 'h-16 w-16 border-3'
  }

  const spinner = (
    <div className={`animate-spin rounded-full border-t-primary-500 border-primary-500/20 ${sizeClasses[size]}`} />
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {spinner}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center p-4">
      {spinner}
    </div>
  )
}

// HOC to add loading state to any component
export function withLoading<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  isLoading: boolean,
  fullScreen: boolean = false
) {
  return function WithLoadingComponent(props: P) {
    if (isLoading) {
      return <LoadingSpinner fullScreen={fullScreen} />
    }

    return <WrappedComponent {...props} />
  }
}
