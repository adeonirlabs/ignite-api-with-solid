import { beforeEach, describe, expect, it } from 'bun:test'
import { compare } from 'bcryptjs'

import { CreateUserUseCase } from '~/features/user/use-cases/create-user.usecase'
import { InMemoryUserRepository } from '~/repositories/in-memory/user.repository'
import { ConflictError } from '~/shared/errors/conflict.error'

describe('Create User Use Case', () => {
  let userRepository: InMemoryUserRepository
  let createUserUseCase: CreateUserUseCase

  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    createUserUseCase = new CreateUserUseCase(userRepository)
  })

  it('should be able to create a user', async () => {
    const { user } = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should create a hashed password', async () => {
    const { user } = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
    })

    const isHashed = await compare('123456', user.password)

    expect(isHashed).toBe(true)
  })

  it('should not be able to create a user with an existing email', async () => {
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

  it('should be able to find a user by email', async () => {
    const data = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
    }

    await createUserUseCase.execute(data)

    const user = await userRepository.findByEmail(data.email)

    expect(user).not.toBeNull()
  })
})
