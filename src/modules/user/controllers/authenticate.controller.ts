import type { FastifyReply, FastifyRequest } from 'fastify'

import { UnauthorizedError } from '~/errors/unauthorized.error'
import { authenticateSchema } from '~/modules/user/dtos/authenticate.dto'
import { authenticateFactory } from '~/modules/user/factories/authenticate.factory'

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
