import type { Gym } from '@prisma/client'
import { z } from 'zod'

export const fetchNearbyGymSchema = z.object({
  userLatitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
  userLongitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
})

export type FetchNearbyGymRequest = z.infer<typeof fetchNearbyGymSchema>

export type FetchNearbyGymResponse = {
  gyms: Gym[]
}

export const fetchNearbyGymQuerySchema = z.object({
  latitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
  longitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
})

export type FetchNearbyGymQueryRequest = z.infer<
  typeof fetchNearbyGymQuerySchema
>
