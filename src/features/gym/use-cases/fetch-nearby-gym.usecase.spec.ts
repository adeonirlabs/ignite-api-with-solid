import { beforeEach, describe, expect, it } from 'vitest'

import { FetchNearbyGymUseCase } from '~/features/gym/use-cases/fetch-nearby-gym.usecase'
import { InMemoryGymRepository } from '~/repositories/in-memory/gym.repository'

describe('Fetch Nearby Gym Use Case', () => {
  let gymRepository: InMemoryGymRepository
  let fetchNearbyGymUseCase: FetchNearbyGymUseCase

  beforeEach(async () => {
    gymRepository = new InMemoryGymRepository()
    fetchNearbyGymUseCase = new FetchNearbyGymUseCase(gymRepository)
  })

  it('should be to fetch nearby gyms', async () => {
    // Nearby gym
    await gymRepository.create({
      name: 'gym-1',
      latitude: -29.2974162,
      longitude: -51.5009403,
    })

    // Distant gym
    await gymRepository.create({
      name: 'gym-2',
      latitude: -29.4400073,
      longitude: -51.5051592,
    })

    const { gyms } = await fetchNearbyGymUseCase.execute({
      userLatitude: -29.295474,
      userLongitude: -51.500698,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ name: 'gym-1' })])
  })
})
