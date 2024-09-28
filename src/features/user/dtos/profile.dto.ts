import { z } from 'zod'

export const profileSchema = z.object({
  userId: z.string().ulid(),
})

export type ProfileRequest = z.infer<typeof profileSchema>
