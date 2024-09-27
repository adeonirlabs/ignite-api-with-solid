import type { FastifyReply, FastifyRequest } from 'fastify'

import { authenticateSchema } from '~/features/user/dtos/authenticate.dto'
import { AuthenticateUseCase } from '~/features/user/use-cases/authenticate.usecase'
import { PrismaUserRepository } from '~/repositories/prisma/user.repository'
import { UnauthorizedError } from '~/shared/errors/unauthorized.error'

export class AuthenticateController {
  async authenticate(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = authenticateSchema.parse(request.body)

    const userRepository = new PrismaUserRepository()
    const authenticateUseCase = new AuthenticateUseCase(userRepository)

    try {
      await authenticateUseCase.execute({ email, password })
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        return reply.status(401).send({ message: error.message })
      }

      throw error
    }

    return reply.status(200).send()
  }
}
