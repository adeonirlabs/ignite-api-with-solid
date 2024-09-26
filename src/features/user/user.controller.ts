import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserRepository } from '~/features/user/repositories/user.repository'
import { CreateUserUseCase } from '~/features/user/use-cases/create-user.usecase'

const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

export class UserController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const userRepository = new UserRepository()
    const createUserUseCase = new CreateUserUseCase(userRepository)

    const { name, email, password } = createUserSchema.parse(request.body)

    try {
      await createUserUseCase.execute({ name, email, password })
    } catch (error) {
      return reply.status(409).send({ message: (error as Error).message })
    }

    return reply.status(201).send()
  }
}
