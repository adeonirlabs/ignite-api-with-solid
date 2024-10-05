import type { FastifyReply, FastifyRequest } from 'fastify'

import { searchGymSchema } from '~/modules/gym/dtos/search.dto'
import { searchGymFactory } from '~/modules/gym/factories/search.factory'

export class SearchGymController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const searchGymUseCase = searchGymFactory()

    const { query, page } = searchGymSchema.parse(request.params)

    const { gyms } = await searchGymUseCase.execute({
      query,
      page,
    })

    return reply.status(200).send({ gyms })
  }
}
