import type { FastifyInstance } from 'fastify'

import { gymRoutes } from '~/features/gym/routes'
import { userRoutes } from '~/features/user/routes'

export async function routes(app: FastifyInstance) {
  app.register(gymRoutes)
  app.register(userRoutes)
}
