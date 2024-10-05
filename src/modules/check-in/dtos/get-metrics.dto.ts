import { z } from 'zod'

export const getMetricsSchema = z.object({
  userId: z.string().uuid(),
})

export type GetMetricsRequest = z.infer<typeof getMetricsSchema>

export type GetMetricsResponse = {
  count: number
}
