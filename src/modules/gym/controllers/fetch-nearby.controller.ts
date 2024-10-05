import type { FastifyReply, FastifyRequest } from 'fastify'

import { fetchNearbyGymSchema } from '~/modules/gym/dtos/fetch-nearby.dto'
import { fetchNearbyGymFactory } from '~/modules/gym/factories/fetch-nearby.factory'

export class FetchNearbyGymController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const fetchNearbyGymUseCase = fetchNearbyGymFactory()

    const { latitude, longitude } = fetchNearbyGymSchema.parse(request.params)

    const { gyms } = await fetchNearbyGymUseCase.execute({
      latitude,
      longitude,
    })

    return reply.status(200).send({ gyms })
  }
}
