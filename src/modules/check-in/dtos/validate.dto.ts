import type { CheckIn } from '@prisma/client'
import { z } from 'zod'

export const validateCheckInSchema = z.object({
  checkInId: z.string(),
})

export type ValidateCheckInRequest = z.infer<typeof validateCheckInSchema>

export type ValidateCheckInResponse = {
  checkIn: CheckIn
}

export const validateCheckInParamsSchema = z.object({
  checkInId: z.string(),
})

export type ValidateCheckInParamsRequest = z.infer<
  typeof validateCheckInParamsSchema
>
