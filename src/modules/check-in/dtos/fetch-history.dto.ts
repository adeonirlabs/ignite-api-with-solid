import type { CheckIn } from '@prisma/client'
import { z } from 'zod'

export const fetchCheckInHistorySchema = z.object({
  userId: z.string().uuid(),
  page: z.number(),
})

export type FetchHistoryRequest = z.infer<typeof fetchCheckInHistorySchema>

export type FetchHistoryResponse = {
  checkIns: CheckIn[]
}
