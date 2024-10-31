import Form from './Form'
import Input from './Input'
import Select from './Select'
import TextArea from './TextArea'
import FormError, { FormField, FormSection, FormActions } from './FormError'

export {
  Form,
  Input,
  Select,
  TextArea,
  FormError,
  FormField,
  FormSection,
  FormActions
}

// Example usage:
/*
import { 
  Form, 
  Input, 
  Select, 
  TextArea, 
  FormError,
  FormField,
  FormSection,
  FormActions
} from '@/components/form'

function MyForm() {
  const handleSubmit = (e: React.FormEvent) => {
    // Handle form submission
  }

  return (
    <Form
      onSubmit={handleSubmit}
      title="My Form"
      description="Fill out the form below"
      error={formError}
    >
      <FormSection title="Personal Information">
        <FormField>
          <Input
            label="Name"
            name="name"
            required
            error={errors.name}
          />
        </FormField>
        
        <FormField>
          <Select
            label="Country"
            name="country"
            options={countryOptions}
            error={errors.country}
          />
        </FormField>
      </FormSection>

      <FormSection title="Additional Information">
        <FormField>
          <TextArea
            label="Bio"
            name="bio"
            error={errors.bio}
          />
        </FormField>
      </FormSection>

      <FormActions>
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit" loading={isSubmitting}>
          Submit
        </Button>
      </FormActions>
    </Form>
  )
}
*/
