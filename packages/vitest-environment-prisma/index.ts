import 'dotenv/config'

import { execSync } from 'child_process'
import { randomUUID } from 'crypto'
import type { Environment } from 'vitest/environments'

export default (<Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  setup() {
    const schema = randomUUID()
    const databaseUrl = setupDatabaseUrl(schema)

    process.env.DATABASE_URL = databaseUrl

    execSync('npx prisma migrate deploy')

    return {
      teardown() {
        execSync('npx prisma migrate reset --force')
      },
    }
  },
})

function setupDatabaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set')
  }
  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)
  return url.toString()
}
