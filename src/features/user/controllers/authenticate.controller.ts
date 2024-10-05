import type { FastifyReply, FastifyRequest } from 'fastify'

import { authenticateSchema } from '~/features/user/dtos/authenticate.dto'
import { authenticateFactory } from '~/features/user/factories/authenticate.factory'
import { UnauthorizedError } from '~/shared/errors/unauthorized.error'

export class AuthenticateController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = authenticateSchema.parse(request.body)

    const authenticateUseCase = authenticateFactory()

    try {
      const { user } = await authenticateUseCase.execute({ email, password })

      const token = await reply.jwtSign(
        {},
        {
          sign: {
            sub: user.id,
          },
        }
      )

      return reply.status(200).send({ token })
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        return reply.status(401).send({ message: error.message })
      }

      throw error
    }
  }
}
