import type { FastifyReply, FastifyRequest } from 'fastify'

import { searchGymSchema } from '~/features/gym/dtos/search-gym.dto'
import { searchGymFactory } from '~/features/gym/factories/search-gym.factory'

export class SearchGymController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const searchGymUseCase = searchGymFactory()

    const { query, page } = searchGymSchema.parse(request.body)

    const { gyms } = await searchGymUseCase.execute({
      query,
      page,
    })

    return reply.status(200).send({ gyms })
  }
}
