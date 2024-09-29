import type { CheckIn } from '@prisma/client'
import { z } from 'zod'

export const CheckInSchema = z.object({
  userId: z.string(),
  gymId: z.string(),
})

export type CheckInRequest = z.infer<typeof CheckInSchema>

export type CheckInResponse = {
  checkIn: CheckIn
}
