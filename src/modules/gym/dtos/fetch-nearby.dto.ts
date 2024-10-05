import type { Gym } from '@prisma/client'
import { z } from 'zod'

export const fetchNearbyGymSchema = z.object({
  latitude: z.number().refine((value) => Math.abs(value) < 90, {
    message: 'Latitude must be between -90 and 90',
  }),
  longitude: z.number().refine((value) => Math.abs(value) < 180, {
    message: 'Longitude must be between -180 and 180',
  }),
})

export type FetchNearbyGymRequest = z.infer<typeof fetchNearbyGymSchema>

export type FetchNearbyGymResponse = {
  gyms: Gym[]
}
