import type { FastifyReply, FastifyRequest } from 'fastify'

import { createUserSchema } from '~/features/user/dtos/create-user.dto'
import { CreateUserUseCase } from '~/features/user/use-cases/create-user.usecase'
import { PrismaUserRepository } from '~/repositories/prisma/user.repository'
import { ConflictError } from '~/shared/errors/conflict.error'

export class UserController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const userRepository = new PrismaUserRepository()
    const createUserUseCase = new CreateUserUseCase(userRepository)

    const { name, email, password } = createUserSchema.parse(request.body)

    try {
      await createUserUseCase.execute({ name, email, password })
    } catch (error) {
      if (error instanceof ConflictError) {
        return reply.status(409).send({ message: error.message })
      }

      return reply.status(500).send()
    }

    return reply.status(201).send()
  }
}
