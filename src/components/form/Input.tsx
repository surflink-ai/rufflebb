import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    const inputClasses = [
      'w-full px-4 py-2 border rounded-lg transition-colors',
      'focus:ring-2 focus:ring-primary-500 focus:border-transparent',
      error 
        ? 'border-red-300 focus:ring-red-500' 
        : 'border-gray-300 hover:border-primary-300',
      className
    ].join(' ')

    return (
      <div className="space-y-1">
        {label && (
          <label 
            htmlFor={props.id} 
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={inputClasses}
          {...props}
        />
        {(error || helperText) && (
          <p className={`text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
