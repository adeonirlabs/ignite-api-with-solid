import type { FastifyReply, FastifyRequest } from 'fastify'

import { fetchNearbyGymQuerySchema } from '~/modules/gym/dtos/fetch-nearby.dto'
import { fetchNearbyGymFactory } from '~/modules/gym/factories/fetch-nearby.factory'

export class FetchNearbyGymController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const fetchNearbyGymUseCase = fetchNearbyGymFactory()

    const { latitude, longitude } = fetchNearbyGymQuerySchema.parse(
      request.query
    )

    const { gyms } = await fetchNearbyGymUseCase.execute({
      userLatitude: latitude,
      userLongitude: longitude,
    })

    return reply.status(200).send({ gyms })
  }
}
