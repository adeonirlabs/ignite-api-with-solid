import { randomUUID } from 'crypto'
import type { Prisma, User } from '@prisma/client'

import type { UserRepository } from '~/repositories/interfaces/user-repository'

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = []

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email) ?? null

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      createdAt: new Date(),
    }

    this.users.push(user)

    return user
  }
}
