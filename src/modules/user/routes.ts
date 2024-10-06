import type { FastifyInstance } from 'fastify'

import { verifyJwt } from '~/middlewares/verify-jwt'
import { AuthenticateController } from '~/modules/user/controllers/authenticate.controller'
import { CreateUserController } from '~/modules/user/controllers/create.controller'
import { ProfileController } from '~/modules/user/controllers/profile.controller'
import { RefreshController } from '~/modules/user/controllers/refresh.controller'

export async function userRoutes(app: FastifyInstance) {
  const authenticateController = new AuthenticateController()
  const createUserController = new CreateUserController()
  const profileController = new ProfileController()
  const refreshController = new RefreshController()

  // Public routes
  app.post('/users', createUserController.handle)
  app.post('/sessions', authenticateController.handle)
  app.patch('/refresh', refreshController.handle)

  // Private routes
  app.get('/profile', { onRequest: [verifyJwt] }, profileController.show)
}
