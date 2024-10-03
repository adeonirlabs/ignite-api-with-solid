import type { FastifyReply, FastifyRequest } from 'fastify'

import { profileFactory } from '~/features/user/factories/profile.factory'

export class ProfileController {
  async show(request: FastifyRequest, reply: FastifyReply) {
    const profileUseCase = profileFactory()

    const { user } = await profileUseCase.execute({ userId: request.user.sub })

    return reply.send({ ...user, password: undefined })
  }
}
