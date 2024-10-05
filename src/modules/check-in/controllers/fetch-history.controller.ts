import type { FastifyReply, FastifyRequest } from 'fastify'

import { fetchCheckInHistoryQuerySchema } from '~/modules/check-in/dtos/fetch-history.dto'
import { fetchHistoryFactory } from '~/modules/check-in/factories/fetch-history.factory'

export class FetchHistoryController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const fetchHistoryUseCase = fetchHistoryFactory()

    const { page } = fetchCheckInHistoryQuerySchema.parse(request.body)

    const { checkIns } = await fetchHistoryUseCase.execute({
      userId: request.user.sub,
      page,
    })

    return reply.status(200).send({ checkIns })
  }
}
