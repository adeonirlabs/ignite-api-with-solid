import type { CheckIn } from '@prisma/client'
import { z } from 'zod'

export const createCheckInSchema = z.object({
  userId: z.string(),
  gymId: z.string(),
  userLatitude: z.number(),
  userLongitude: z.number(),
})

export type CreateCheckInRequest = z.infer<typeof createCheckInSchema>

export type CreateCheckInResponse = {
  checkIn: CheckIn
}
