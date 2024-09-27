import type { FastifyInstance } from 'fastify'

import { CreateUserController } from './controllers/create-user.controller'

export async function userRoutes(app: FastifyInstance) {
  const userController = new CreateUserController()

  app.post('/users', userController.create)
}
