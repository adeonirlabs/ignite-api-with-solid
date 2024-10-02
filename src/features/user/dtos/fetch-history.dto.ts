import type { CheckIn } from '@prisma/client'
import { z } from 'zod'

export const fetchCheckInHistorySchema = z.object({
  userId: z.string().uuid(),
})

export type FetchCheckInHistoryRequest = z.infer<
  typeof fetchCheckInHistorySchema
>

export type FetchCheckInHistoryResponse = {
  checkIns: CheckIn[]
}
