import type { FastifyInstance } from 'fastify'

import { UserController } from './user.controller'

export async function userRoutes(app: FastifyInstance) {
  const userController = new UserController()

  app.post('/users', userController.create)
}
