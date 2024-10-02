import { beforeEach, describe, expect, it } from 'vitest'

import { FetchCheckInHistoryUseCase } from '~/features/user/use-cases/fetch-history.usecase'
import { InMemoryCheckInRepository } from '~/repositories/in-memory/check-in.repository'

describe('Fetch Check-in History Use Case', () => {
  let checkInRepository: InMemoryCheckInRepository
  let fetchCheckInHistoryUseCase: FetchCheckInHistoryUseCase

  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    fetchCheckInHistoryUseCase = new FetchCheckInHistoryUseCase(
      checkInRepository
    )
  })

  it('should be to fetch check in history', async () => {
    await checkInRepository.create({
      userId: 'user-1',
      gymId: 'gym-1',
    })

    await checkInRepository.create({
      userId: 'user-1',
      gymId: 'gym-2',
    })

    const { checkIns } = await fetchCheckInHistoryUseCase.execute({
      userId: 'user-1',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: 'gym-1' }),
      expect.objectContaining({ gymId: 'gym-2' }),
    ])
  })

  it('should be ale to fetch check in paginated history', async () => {
    for (let i = 1; i <= 28; i++) {
      await checkInRepository.create({
        userId: 'user-1',
        gymId: `gym-${i}`,
      })
    }

    const { checkIns } = await fetchCheckInHistoryUseCase.execute({
      userId: 'user-1',
      page: 2,
    })

    expect(checkIns).toHaveLength(8)
  })
})
