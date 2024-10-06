import type { FastifyReply, FastifyRequest } from 'fastify'

export class RefreshController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    await request.jwtVerify({ onlyCookie: true })

    const { sub, role } = request.user

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
  }
}
