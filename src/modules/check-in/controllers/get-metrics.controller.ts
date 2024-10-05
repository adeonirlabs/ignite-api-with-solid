import type { FastifyReply, FastifyRequest } from 'fastify'

import { getMetricsFactory } from '~/modules/check-in/factories/get-metrics.factory'

export class GetMetricsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const getMetricsUseCase = getMetricsFactory()

    const { count } = await getMetricsUseCase.execute({
      userId: request.user.sub,
    })

    return reply.status(200).send({ count })
  }
}
