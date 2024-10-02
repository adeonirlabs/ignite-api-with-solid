import { beforeEach, describe, expect, it } from 'vitest'

import { ProfileUseCase } from '~/features/user/use-cases/profile.usecase'
import { InMemoryUserRepository } from '~/repositories/in-memory/user.repository'
import { NotFoundError } from '~/shared/errors/not-found'

describe('Profile Use Case', () => {
  let userRepository: InMemoryUserRepository
  let profileUseCase: ProfileUseCase

  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    profileUseCase = new ProfileUseCase(userRepository)
  })

  it('should be able to get user profile', async () => {
    const user = await userRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
    })

    const { user: userProfile } = await profileUseCase.execute({
      userId: user.id,
    })

    expect(userProfile).toEqual(expect.objectContaining({}))
  })

  it('should not be able to get user profile with invalid id', async () => {
    await expect(
      profileUseCase.execute({
        userId: 'invalid-id',
      })
    ).rejects.toBeInstanceOf(NotFoundError)
  })
})
