import type { FastifyInstance } from 'fastify'

import { checkInsRoutes } from '~/modules/check-in/routes'
import { gymRoutes } from '~/modules/gym/routes'
import { userRoutes } from '~/modules/user/routes'

export async function routes(app: FastifyInstance) {
  app.register(gymRoutes)
  app.register(userRoutes)
  app.register(checkInsRoutes)
}
