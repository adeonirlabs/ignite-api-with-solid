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
      const { id: sub, role } = user

      const token = await reply.jwtSign(
        {
          role,
        },
        {
          sign: {
            sub,
          },
        }
      )

      const refreshToken = await reply.jwtSign(
        {
          role,
        },
        {
          sign: {
            sub,
            expiresIn: '7d',
          },
        }
      )

      return reply
        .status(200)
        .setCookie('refreshToken', refreshToken, {
          path: '/',
          secure: true,
          sameSite: true,
          httpOnly: true,
        })
        .send({ token })
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        return reply.status(401).send({ message: error.message })
      }

      throw error
    }
  }
}
