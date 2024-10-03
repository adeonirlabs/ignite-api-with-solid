import type { FastifyInstance } from 'fastify'

import { AuthenticateController } from '~/features/user/controllers/authenticate.controller'
import { ProfileController } from '~/features/user/controllers/profile.controller'
import { CreateUserController } from './controllers/create-user.controller'

export async function userRoutes(app: FastifyInstance) {
  const createUserController = new CreateUserController()
  const authenticateController = new AuthenticateController()
  const profileController = new ProfileController()

  // Public routes
  app.post('/users', createUserController.create)
  app.post('/sessions', authenticateController.authenticate)

  // Private routes
  app.get('/profile', profileController.show)
}
