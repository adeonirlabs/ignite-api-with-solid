import type { Prisma } from '@prisma/client'

import type { UserRepository } from '~/repositories/interfaces/user.interface'
import { prisma } from '~/shared/services/database'

export class PrismaUserRepository implements UserRepository {
  async findAll() {
    const users = await prisma.user.findMany()

    return users
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
