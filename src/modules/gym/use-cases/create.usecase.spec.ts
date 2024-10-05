import { beforeEach, describe, expect, it } from 'vitest'

import { CreateGymUseCase } from '~/modules/gym/use-cases/create.usecase'
import { InMemoryGymRepository } from '~/repositories/in-memory/gym.repository'

describe('Create Gym Use Case', () => {
  let gymRepository: InMemoryGymRepository
  let createGymUseCase: CreateGymUseCase

  beforeEach(() => {
    gymRepository = new InMemoryGymRepository()
    createGymUseCase = new CreateGymUseCase(gymRepository)
  })

  it('should be able to create a gym', async () => {
    const { gym } = await createGymUseCase.execute({
      name: 'Gym 1',
      description: null,
      phone: null,
      latitude: -29.297956,
      longitude: -51.500644,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
