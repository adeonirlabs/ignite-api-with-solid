import type { FastifyInstance } from 'fastify'

import { CreateGymController } from '~/features/gym/controllers/create-gym.controller'
import { verifyJwt } from '~/middlewares/verify-jwt'

export async function gymRoutes(app: FastifyInstance) {
  const createGymController = new CreateGymController()

  app.addHook('onRequest', verifyJwt)

  // Private routes
  app.post('/gyms', createGymController.handle)
}
