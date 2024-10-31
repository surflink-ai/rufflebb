import React from 'react'

interface FormErrorProps {
  error?: string | string[]
  className?: string
}

export default function FormError({ error, className = '' }: FormErrorProps) {
  if (!error) return null

  const errors = Array.isArray(error) ? error : [error]

  return (
    <div 
      className={`rounded-lg bg-red-50 border border-red-200 p-4 ${className}`}
      role="alert"
    >
      {errors.length === 1 ? (
        <p className="text-sm text-red-600">{errors[0]}</p>
      ) : (
        <ul className="list-disc list-inside space-y-1">
          {errors.map((err, index) => (
            <li key={index} className="text-sm text-red-600">
              {err}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// Export a form field wrapper component for consistent spacing
export function FormField({ children, className = '' }: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      {children}
    </div>
  )
}

// Export a form section component for grouping related fields
export function FormSection({ 
  title, 
  description, 
  children, 
  className = '' 
}: { 
  title?: string
  description?: string
  children: React.ReactNode
  className?: string 
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      {(title || description) && (
        <div className="space-y-1">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm text-gray-500">
              {description}
            </p>
          )}
        </div>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  )
}

// Export a form actions component for consistent button layout
export function FormActions({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <div className={`flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 ${className}`}>
      {children}
    </div>
  )
}

// Export a form divider component
export function FormDivider({ 
  label,
  className = '' 
}: { 
  label?: string
  className?: string 
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200"></div>
      </div>
      {label && (
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">
            {label}
          </span>
        </div>
      )}
    </div>
  )
}

// Export a form helper text component
export function FormHelperText({
  children,
  className = ''
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p className={`text-sm text-gray-500 ${className}`}>
      {children}
    </p>
  )
}

// Export a form label component
export function FormLabel({
  children,
  required,
  className = ''
}: {
  children: React.ReactNode
  required?: boolean
  className?: string
}) {
  return (
    <label className={`block text-sm font-medium text-gray-700 ${className}`}>
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  )
}
