import React from 'react'
import FormError from './FormError'

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit: (e: React.FormEvent) => void
  title?: string
  description?: string
  error?: string | string[]
}

export default function Form({
  children,
  onSubmit,
  title,
  description,
  error,
  className = '',
  ...props
}: FormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(e)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-6 ${className}`}
      {...props}
    >
      {(title || description) && (
        <div className="space-y-1">
          {title && (
            <h2 className="text-2xl font-bold text-gray-900">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-gray-600">
              {description}
            </p>
          )}
        </div>
      )}

      {error && <FormError error={error} />}

      <div className="space-y-6">
        {children}
      </div>
    </form>
  )
}

// Example usage:
/*
import { Form, FormField, FormSection, FormActions, Input, Button } from '@/components/form'

function MyForm() {
  const handleSubmit = (e: React.FormEvent) => {
    // Handle form submission
  }

  return (
    <Form
      onSubmit={handleSubmit}
      title="Profile Information"
      description="Update your profile details below"
      error={formError}
    >
      <FormSection title="Personal Details">
        <FormField>
          <Input
            label="Full Name"
            name="name"
            required
            placeholder="Enter your full name"
          />
        </FormField>
        <FormField>
          <Input
            label="Email"
            name="email"
            type="email"
            required
            placeholder="Enter your email"
          />
        </FormField>
      </FormSection>

      <FormActions>
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit">
          Save Changes
        </Button>
      </FormActions>
    </Form>
  )
}
*/
