import type { FastifyReply, FastifyRequest } from 'fastify'

import { createUserSchema } from '~/modules/user/dtos/create-user.dto'
import { createUserFactory } from '~/modules/user/factories/create-user.factory'
import { ConflictError } from '~/shared/errors/conflict.error'

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
