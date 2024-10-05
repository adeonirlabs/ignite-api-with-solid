import type { FastifyReply, FastifyRequest } from 'fastify'

import { ConflictError } from '~/errors/conflict.error'
import { createUserSchema } from '~/modules/user/dtos/create.dto'
import { createUserFactory } from '~/modules/user/factories/create.factory'

export class CreateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const createUserUseCase = createUserFactory()

    const { name, email, password } = createUserSchema.parse(request.body)

    try {
      await createUserUseCase.execute({ name, email, password })
    } catch (error) {
      if (error instanceof ConflictError) {
        return reply.status(409).send({ message: error.message })
      }

      throw error
    }

    return reply.status(201).send()
  }
}
