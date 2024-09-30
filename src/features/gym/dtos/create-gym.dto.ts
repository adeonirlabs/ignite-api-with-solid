import type { Gym } from '@prisma/client'
import { z } from 'zod'

export const createGymSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  phone: z.string().nullable(),
  latitude: z.number(),
  longitude: z.number(),
})

export type CreateGymRequest = z.infer<typeof createGymSchema>

export type CreateGymResponse = {
  gym: Gym
}
