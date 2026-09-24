//Hi Travelogic code reviewer, as you know. Zod is a typescript form validation library
//in this case, I have used Zod to validate the supplier form fields. The schema defines the expected structure and validation rules for the form data.
//  Each field has specific requirements, such as minimum and maximum lengths, required fields, and URL validation for the website field. The `SupplierFormValues` type is
//  inferred from the schema, ensuring type safety throughout the application when working with supplier form data.

import { z } from 'zod'

export const supplierFormSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(200, 'Name is too long'),
  address: z.string().trim().min(1, 'Address is required').max(500, 'Address is too long'),
  website: z
    .string()
    .trim()
    .min(1, 'Website is required')
    .url('Enter a valid URL (include https://)'),
  phoneNumber: z
    .string()
    .trim()
    .min(1, 'Phone number is required')
    .max(30, 'Phone number is too long'),
  country: z.number().int().min(0, 'Country is required'),
})

export type SupplierFormValues = z.infer<typeof supplierFormSchema>
