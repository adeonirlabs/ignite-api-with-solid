import type { FastifyReply, FastifyRequest } from 'fastify'

import { fetchNearbyGymSchema } from '~/features/gym/dtos/fetch-nearby-gym.dto'
import { fetchNearbyGymFactory } from '~/features/gym/factories/fetch-nearby-gym.factory'

export class FetchNearbyGymController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const fetchNearbyGymUseCase = fetchNearbyGymFactory()

    const { userLatitude, userLongitude } = fetchNearbyGymSchema.parse(
      request.body
    )

    const { gyms } = await fetchNearbyGymUseCase.execute({
      userLatitude,
      userLongitude,
    })

    return reply.status(200).send({ gyms })
  }
}
