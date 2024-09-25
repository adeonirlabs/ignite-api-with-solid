import 'dotenv/config'

import { z } from 'zod'

export const envSchema = z.object({
  BASE_URL: z.string().url(),
  DATABASE_URL: z.string().url(),
  HOST: z.string().default('0.0.0.0'),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
