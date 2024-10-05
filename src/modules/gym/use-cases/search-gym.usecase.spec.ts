import { beforeEach, describe, expect, it } from 'vitest'

import { SearchGymUseCase } from '~/modules/gym/use-cases/search-gym.usecase'
import { InMemoryGymRepository } from '~/repositories/in-memory/gym.repository'

describe('Fetch Check-in History Use Case', () => {
  let gymRepository: InMemoryGymRepository
  let searchGymUseCase: SearchGymUseCase

  beforeEach(async () => {
    gymRepository = new InMemoryGymRepository()
    searchGymUseCase = new SearchGymUseCase(gymRepository)
  })

  it('should be to search gyms', async () => {
    await gymRepository.create({
      name: 'Gym 1',
      latitude: -29.297956,
      longitude: -51.500644,
    })

    await gymRepository.create({
      name: 'Gym 2',
      latitude: -29.297956,
      longitude: -51.500644,
    })

    const { gyms } = await searchGymUseCase.execute({
      query: 'gym',
      page: 1,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ name: 'Gym 1' }),
      expect.objectContaining({ name: 'Gym 2' }),
    ])
  })

  it('should be ale to fetch gyms paginated', async () => {
    for (let i = 1; i <= 28; i++) {
      await gymRepository.create({
        name: `Gym ${i}`,
        latitude: -29.297956,
        longitude: -51.500644,
      })
    }

    const { gyms } = await searchGymUseCase.execute({
      query: 'gym',
      page: 2,
    })

    expect(gyms).toHaveLength(8)
  })
})
