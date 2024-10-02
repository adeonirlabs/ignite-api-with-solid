import { beforeEach, describe, expect, it } from 'vitest'

import { GetUserMetricsUseCase } from '~/features/check-in/use-cases/get-user-metrics.usecase'
import { InMemoryCheckInRepository } from '~/repositories/in-memory/check-in.repository'

describe('Get User Metrics Use Case', () => {
  let checkInRepository: InMemoryCheckInRepository
  let getUserMetricsUseCase: GetUserMetricsUseCase

  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    getUserMetricsUseCase = new GetUserMetricsUseCase(checkInRepository)
  })

  it('should be to get user metrics', async () => {
    await checkInRepository.create({
      userId: 'user-1',
      gymId: 'gym-1',
    })

    await checkInRepository.create({
      userId: 'user-1',
      gymId: 'gym-2',
    })

    const { count } = await getUserMetricsUseCase.execute({
      userId: 'user-1',
    })

    expect(count).toEqual(2)
  })
})
