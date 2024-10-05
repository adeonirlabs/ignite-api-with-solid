import type { Gym } from '@prisma/client'
import { z } from 'zod'

export const createGymSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  phone: z.string().nullable(),
  latitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
  longitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
})

export type CreateGymRequest = z.infer<typeof createGymSchema>

export type CreateGymResponse = {
  gym: Gym
}
