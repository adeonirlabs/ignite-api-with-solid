import type { FastifyInstance } from 'fastify'

import { verifyJwt } from '~/middlewares/verify-jwt'
import { CreateGymController } from '~/modules/gym/controllers/create-gym.controller'
import { FetchNearbyGymController } from '~/modules/gym/controllers/fetch-nearby-gym.controller'
import { SearchGymController } from '~/modules/gym/controllers/search-gym.controller'

export async function gymRoutes(app: FastifyInstance) {
  const createGymController = new CreateGymController()
  const fetchNearbyGymController = new FetchNearbyGymController()
  const searchGymController = new SearchGymController()

  app.addHook('onRequest', verifyJwt)

  // Private routes
  app.post('/gyms', createGymController.handle)
  app.get('/gyms/nearby', fetchNearbyGymController.handle)
  app.get('/gyms/search', searchGymController.handle)
}
