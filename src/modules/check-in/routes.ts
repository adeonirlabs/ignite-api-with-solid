import type { FastifyInstance } from 'fastify'

import { verifyJwt } from '~/middlewares/verify-jwt'
import { verifyUserRole } from '~/middlewares/verify-user-role'
import { CreateCheckInController } from '~/modules/check-in/controllers/create.controller'
import { FetchHistoryController } from '~/modules/check-in/controllers/fetch-history.controller'
import { GetMetricsController } from '~/modules/check-in/controllers/get-metrics.controller'
import { ValidateCheckInController } from '~/modules/check-in/controllers/validate.controller'

export async function checkInsRoutes(app: FastifyInstance) {
  const createCheckInController = new CreateCheckInController()
  const validateCheckInController = new ValidateCheckInController()
  const fetchHistoryController = new FetchHistoryController()
  const getMetricsController = new GetMetricsController()

  app.addHook('onRequest', verifyJwt)

  // Private routes
  app.post('/gyms/:gymId/check-ins', createCheckInController.handle)
  app.get('/check-ins/history', fetchHistoryController.handle)
  app.get('/check-ins/metrics', getMetricsController.handle)
  app.patch(
    '/check-ins/:checkInId/validate',
    { onRequest: [verifyUserRole('admin')] },
    validateCheckInController.handle
  )
}
