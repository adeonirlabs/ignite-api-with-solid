import type { Role } from '@prisma/client'
import type { FastifyReply } from 'fastify/types/reply'
import type { FastifyRequest } from 'fastify/types/request'

export function verifyUserRole(role: Role) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role: userRole } = request.user

    if (userRole !== role) {
      return reply.status(403).send({ message: 'Forbidden' })
    }
  }
}
