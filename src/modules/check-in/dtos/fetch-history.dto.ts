import type { CheckIn } from '@prisma/client'
import { z } from 'zod'

export const fetchCheckInHistorySchema = z.object({
  userId: z.string().uuid(),
  page: z.number(),
})

export type FetchCheckInHistoryRequest = z.infer<
  typeof fetchCheckInHistorySchema
>

export type FetchCheckInHistoryResponse = {
  checkIns: CheckIn[]
}

export const fetchCheckInHistoryQuerySchema = z.object({
  page: z.number(),
})

export type FetchCheckInHistoryQueryRequest = z.infer<
  typeof fetchCheckInHistoryQuerySchema
>
