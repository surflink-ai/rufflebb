import React from 'react'
import Link from 'next/link'
import LoadingSpinner from './LoadingSpinner'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'small' | 'medium' | 'large'
  fullWidth?: boolean
  loading?: boolean
  href?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'medium',
      fullWidth = false,
      loading = false,
      disabled = false,
      href,
      leftIcon,
      rightIcon,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

    const variants = {
      primary: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700',
      secondary: 'bg-primary-50 text-primary-700 hover:bg-primary-100 active:bg-primary-200',
      outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50 active:bg-primary-100',
      ghost: 'text-primary-500 hover:bg-primary-50 active:bg-primary-100',
      danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800'
    }

    const sizes = {
      small: 'text-sm px-3 py-1.5',
      medium: 'text-base px-4 py-2',
      large: 'text-lg px-6 py-3'
    }

    const classes = [
      baseStyles,
      variants[variant],
      sizes[size],
      fullWidth ? 'w-full' : '',
      className
    ].join(' ')

    const content = (
      <>
        {loading && (
          <LoadingSpinner size="small" />
        )}
        {!loading && leftIcon && (
          <span className="mr-2">{leftIcon}</span>
        )}
        <span className={loading ? 'opacity-0' : ''}>
          {children}
        </span>
        {!loading && rightIcon && (
          <span className="ml-2">{rightIcon}</span>
        )}
      </>
    )

    if (href && !disabled) {
      return (
        <Link href={href} className={classes}>
          {content}
        </Link>
      )
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={classes}
        {...props}
      >
        {content}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
