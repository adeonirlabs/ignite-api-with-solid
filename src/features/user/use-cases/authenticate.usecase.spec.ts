import { beforeAll, beforeEach, describe, expect, it } from 'bun:test'
import { hash } from 'bcryptjs'

import { AuthenticateUseCase } from '~/features/user/use-cases/authenticate.usecase'
import { InMemoryUserRepository } from '~/repositories/in-memory/user.repository'
import { UnauthorizedError } from '~/shared/errors/unauthorized.error'

describe('Authenticate Use Case', () => {
  let userRepository: InMemoryUserRepository
  let authenticateUseCase: AuthenticateUseCase

  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    authenticateUseCase = new AuthenticateUseCase(userRepository)
  })

  it('should be able to authenticate a user', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: await hash('123456', 6),
    })

    const { user } = await authenticateUseCase.execute({
      email: 'john.doe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    expect(
      authenticateUseCase.execute({
        email: 'john.doe@example.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(UnauthorizedError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    expect(
      authenticateUseCase.execute({
        email: 'john.doe@example.com',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(UnauthorizedError)
  })
})
