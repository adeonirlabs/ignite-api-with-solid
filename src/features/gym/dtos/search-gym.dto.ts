import type { Gym } from '@prisma/client'
import { z } from 'zod'

export const searchGymSchema = z.object({
  query: z.string(),
  page: z.number(),
})

export type SearchGymRequest = z.infer<typeof searchGymSchema>

export type SearchGymResponse = {
  gyms: Gym[]
}
