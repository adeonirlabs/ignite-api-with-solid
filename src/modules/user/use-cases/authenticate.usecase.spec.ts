import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { UnauthorizedError } from '~/errors/unauthorized.error'
import { AuthenticateUseCase } from '~/modules/user/use-cases/authenticate.usecase'
import { InMemoryUserRepository } from '~/repositories/in-memory/user.repository'

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
    await expect(
      authenticateUseCase.execute({
        email: 'john.doe@example.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(UnauthorizedError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await expect(
      authenticateUseCase.execute({
        email: 'john.doe@example.com',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(UnauthorizedError)
  })
})
