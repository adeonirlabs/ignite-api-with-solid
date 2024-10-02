import type { CheckIn } from '@prisma/client'
import { z } from 'zod'

export const validateCheckInSchema = z.object({
  checkInId: z.string(),
})

export type ValidateCheckInRequest = z.infer<typeof validateCheckInSchema>

export type ValidateCheckInResponse = {
  checkIn: CheckIn
}
