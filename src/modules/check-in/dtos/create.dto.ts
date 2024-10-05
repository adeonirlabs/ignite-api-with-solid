import type { CheckIn } from '@prisma/client'
import { z } from 'zod'

export const createCheckInSchema = z.object({
  userId: z.string(),
  gymId: z.string(),
  userLatitude: z.number().refine((value) => Math.abs(value) < 90, {
    message: 'Latitude must be between -90 and 90',
  }),
  userLongitude: z.number().refine((value) => Math.abs(value) < 180, {
    message: 'Longitude must be between -180 and 180',
  }),
})

export type CreateCheckInRequest = z.infer<typeof createCheckInSchema>

export type CreateCheckInResponse = {
  checkIn: CheckIn
}

export const createCheckInBodySchema = z.object({
  latitude: z.number().refine((value) => Math.abs(value) < 90, {
    message: 'Latitude must be between -90 and 90',
  }),
  longitude: z.number().refine((value) => Math.abs(value) < 180, {
    message: 'Longitude must be between -180 and 180',
  }),
})

export type CreateCheckInBodyRequest = z.infer<typeof createCheckInBodySchema>

export const createCheckInParamsSchema = z.object({
  gymId: z.string(),
})

export type CreateCheckInParamsRequest = z.infer<
  typeof createCheckInParamsSchema
>
