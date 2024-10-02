import type { Gym } from '@prisma/client'
import { z } from 'zod'

export const fetchNearbyGymSchema = z.object({
  userLatitude: z.number(),
  userLongitude: z.number(),
})

export type FetchNearbyGymRequest = z.infer<typeof fetchNearbyGymSchema>

export type FetchNearbyGymResponse = {
  gyms: Gym[]
}
