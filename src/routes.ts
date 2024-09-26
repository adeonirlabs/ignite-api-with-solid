import type { FastifyInstance } from 'fastify'

import { userRoutes } from '~/features/user/routes'

export async function routes(app: FastifyInstance) {
  app.register(userRoutes)
}
