import type { CheckIn } from '@prisma/client'
import { z } from 'zod'

export const checkInSchema = z.object({
  userId: z.string(),
  gymId: z.string(),
  userLatitude: z.number(),
  userLongitude: z.number(),
})

export type CheckInRequest = z.infer<typeof checkInSchema>

export type CheckInResponse = {
  checkIn: CheckIn
}
