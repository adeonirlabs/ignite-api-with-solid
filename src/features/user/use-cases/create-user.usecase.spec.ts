import { describe, expect, it } from 'bun:test'
import { compare } from 'bcryptjs'

import { CreateUserUseCase } from '~/features/user/use-cases/create-user.usecase'
import { InMemoryUserRepository } from '~/repositories/in-memory/user.repository'
import { ConflictError } from '~/shared/errors/conflict.error'

describe('Create User Use Case', () => {
  it('should be able to create a user', async () => {
    const inMemoryUserRepository = new InMemoryUserRepository()
    const createUserUseCase = new CreateUserUseCase(inMemoryUserRepository)

    const { user } = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

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

  it('should not be able to create a user with an existing email', async () => {
    const inMemoryUserRepository = new InMemoryUserRepository()
    const createUserUseCase = new CreateUserUseCase(inMemoryUserRepository)

    const email = 'john.doe@example.com'

    await createUserUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    expect(
      createUserUseCase.execute({
        name: 'John Doe',
        email,
        password: '123456',
      })
    ).rejects.toBeInstanceOf(ConflictError)
  })
})
