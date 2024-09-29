import type { User } from '@prisma/client'
import { z } from 'zod'

export const authenticateSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export type AuthenticateRequest = z.infer<typeof authenticateSchema>

export type AuthenticateResponse = {
  user: User
}
