import 'dotenv/config'

import { z } from 'zod'

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  BASE_URL: z.string().url().default('http://localhost:3333'),
  DATABASE_URL: z.string().url(),
  HOST: z.string().default('0.0.0.0'),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error(
    'Invalid environment variables',
    JSON.stringify(_env.error.format(), null, 2)
  )

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
