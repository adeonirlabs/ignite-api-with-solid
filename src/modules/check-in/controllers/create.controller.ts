import type { FastifyReply, FastifyRequest } from 'fastify'

import {
  createCheckInBodySchema,
  createCheckInParamsSchema,
} from '~/modules/check-in/dtos/create.dto'
import { createCheckInFactory } from '~/modules/check-in/factories/create.factory'

export class CreateCheckInController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const createCheckInUseCase = createCheckInFactory()

    const { latitude, longitude } = createCheckInBodySchema.parse(request.body)
    const { gymId } = createCheckInParamsSchema.parse(request.params)

    await createCheckInUseCase.execute({
      gymId,
      userId: request.user.sub,
      userLatitude: latitude,
      userLongitude: longitude,
    })

    return reply.status(201).send()
  }
}
