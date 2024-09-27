import { describe, expect, it } from 'bun:test'
import { compare } from 'bcryptjs'

import { CreateUserUseCase } from '~/features/user/use-cases/create-user.usecase'
import { InMemoryUserRepository } from '~/repositories/in-memory/users.repository'

describe('Create User Use Case', () => {
  it('should create a hashed password', async () => {
    const inMemoryUserRepository = new InMemoryUserRepository()
    const createUserUseCase = new CreateUserUseCase(inMemoryUserRepository)

    const { user } = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
    })

    const isHashed = await compare('123456', user.password)

    expect(isHashed).toBe(true)
  })
})
