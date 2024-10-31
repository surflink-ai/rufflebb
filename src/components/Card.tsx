import React from 'react'
import Link from 'next/link'

interface CardProps {
  children: React.ReactNode
  className?: string
  href?: string
  onClick?: () => void
  padding?: boolean
  hover?: boolean
}

export function Card({
  children,
  className = '',
  href,
  onClick,
  padding = true,
  hover = true,
}: CardProps) {
  const classes = [
    'bg-white rounded-xl border border-gray-100 overflow-hidden',
    padding ? 'p-6' : '',
    hover ? 'transition hover:shadow-lg hover:border-primary-100' : '',
    onClick ? 'cursor-pointer' : '',
    className,
  ].join(' ')

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  if (onClick) {
    return (
      <div onClick={onClick} className={classes}>
        {children}
      </div>
    )
  }

  return <div className={classes}>{children}</div>
}

interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {children}
    </div>
  )
}

interface CardTitleProps {
  children: React.ReactNode
  className?: string
}

export function CardTitle({ children, className = '' }: CardTitleProps) {
  return (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
      {children}
    </h3>
  )
}

interface CardDescriptionProps {
  children: React.ReactNode
  className?: string
}

export function CardDescription({ children, className = '' }: CardDescriptionProps) {
  return (
    <p className={`text-sm text-gray-500 ${className}`}>
      {children}
    </p>
  )
}

interface CardContentProps {
  children: React.ReactNode
  className?: string
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

interface CardFooterProps {
  children: React.ReactNode
  className?: string
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`flex items-center pt-6 ${className}`}>
      {children}
    </div>
  )
}

// Example usage:
/*
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>

// As a link
<Card href="/some-page">
  <CardContent>
    <p>Clickable Card</p>
  </CardContent>
</Card>

// With custom padding and hover
<Card padding={false} hover={false}>
  <img src="..." alt="..." className="w-full h-48 object-cover" />
  <div className="p-6">
    <p>Custom Card Content</p>
  </div>
</Card>
*/
