import type { Role } from '@prisma/client'
import { hash } from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import request from 'supertest'

import { prisma } from '~/services/database'

export async function createAuthUser(app: FastifyInstance, role: Role) {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: await hash('123456', 6),
      role,
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'john.doe@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
