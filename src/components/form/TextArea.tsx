import React from 'react'

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    const textAreaClasses = [
      'w-full px-4 py-2 border rounded-lg transition-colors resize-y min-h-[100px]',
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
        <textarea
          ref={ref}
          className={textAreaClasses}
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

TextArea.displayName = 'TextArea'

export default TextArea
