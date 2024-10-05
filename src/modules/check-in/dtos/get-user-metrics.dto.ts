import { z } from 'zod'

export const getUserMetricsSchema = z.object({
  userId: z.string().uuid(),
})

export type GetUserMetricsRequest = z.infer<typeof getUserMetricsSchema>

export type GetUserMetricsResponse = {
  count: number
}
