import type { FastifyInstance } from 'fastify'

import { AuthenticateController } from '~/features/user/controllers/authenticate.controller'
import { ProfileController } from '~/features/user/controllers/profile.controller'
import { verifyJwt } from '~/middlewares/verify-jwt'
import { CreateUserController } from './controllers/create-user.controller'

export async function userRoutes(app: FastifyInstance) {
  const createUserController = new CreateUserController()
  const authenticateController = new AuthenticateController()
  const profileController = new ProfileController()

  // Public routes
  app.post('/users', createUserController.handle)
  app.post('/sessions', authenticateController.handle)

  // Private routes
  app.get('/profile', { onRequest: [verifyJwt] }, profileController.show)
}
