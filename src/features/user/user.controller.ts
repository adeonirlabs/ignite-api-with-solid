import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { prisma } from '~/shared/services/database'

const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

export class UserController {
  async create(req: FastifyRequest, res: FastifyReply) {
    const { name, email, password } = createUserSchema.parse(req.body)

    await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    })

    return res.status(201).send()
  }
}
