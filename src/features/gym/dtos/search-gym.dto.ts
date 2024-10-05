import type { Gym } from '@prisma/client'
import { z } from 'zod'

export const searchGymSchema = z.object({
  query: z.string(),
  page: z.coerce.number().min(1).default(1),
})

export type SearchGymRequest = z.infer<typeof searchGymSchema>

export type SearchGymResponse = {
  gyms: Gym[]
}
