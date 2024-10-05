import type { FastifyInstance } from 'fastify'

import { CreateGymController } from '~/features/gym/controllers/create-gym.controller'
import { SearchGymController } from '~/features/gym/controllers/search-gym.controller'
import { verifyJwt } from '~/middlewares/verify-jwt'

export async function gymRoutes(app: FastifyInstance) {
  const createGymController = new CreateGymController()
  const searchGymController = new SearchGymController()

  app.addHook('onRequest', verifyJwt)

  // Private routes
  app.post('/gyms', createGymController.handle)
  app.get('/gyms/search', searchGymController.handle)
}
