import type { FastifyReply, FastifyRequest } from 'fastify'

import { profileFactory } from '~/features/user/factories/profile.factory'

export class ProfileController {
  async show(request: FastifyRequest, reply: FastifyReply) {
    const { sub } = await request.jwtVerify<{ sub: string }>()

    const profileUseCase = profileFactory()

    const { user } = await profileUseCase.execute({ userId: sub })

    return reply.send({ ...user, password: undefined })
  }
}
