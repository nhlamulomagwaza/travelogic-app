import { z } from 'zod'

export const serviceFormSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(200, 'Title is too long'),
  description: z
    .string()
    .trim()
    .min(1, 'Description is required')
    .max(2000, 'Description is too long'),
  supplierId: z.number().int().positive('Select a supplier'),
})

export const serviceUpdateFormSchema = serviceFormSchema.omit({ supplierId: true })

export type ServiceFormValues = z.infer<typeof serviceFormSchema>
export type ServiceUpdateFormValues = z.infer<typeof serviceUpdateFormSchema>
