import type { FastifyReply, FastifyRequest } from 'fastify'

import { createGymSchema } from '~/modules/gym/dtos/create.dto'
import { createGymFactory } from '~/modules/gym/factories/create.factory'

export class CreateGymController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const createGymUseCase = createGymFactory()

    const { name, description, phone, latitude, longitude } =
      createGymSchema.parse(request.body)

    await createGymUseCase.execute({
      name,
      description,
      phone,
      latitude,
      longitude,
    })

    return reply.status(201).send()
  }
}
