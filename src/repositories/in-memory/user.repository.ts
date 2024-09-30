import { randomUUID } from 'crypto'
import type { Prisma, User } from '@prisma/client'

import type { UserRepository } from '~/repositories/interfaces/user.interface'

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = []

  async findAll() {
    return this.users
  }

  async findById(id: string) {
    return this.users.find((user) => user.id === id) ?? null
  }

  async findByEmail(email: string) {
    return this.users.find((user) => user.email === email) ?? null
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
