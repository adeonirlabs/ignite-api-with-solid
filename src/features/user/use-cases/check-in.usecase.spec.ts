import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { CheckInUseCase } from '~/features/user/use-cases/check-in.usecase'
import { InMemoryCheckInRepository } from '~/repositories/in-memory/check-in.repository'

describe('Check-in Use Case', () => {
  let checkInRepository: InMemoryCheckInRepository
  let checkInUseCase: CheckInUseCase

  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    checkInUseCase = new CheckInUseCase(checkInRepository)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    vi.setSystemTime('2024-01-01T00:00:00.000Z')

    const { checkIn } = await checkInUseCase.execute({
      userId: 'user-id',
      gymId: 'gym-id',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime('2024-01-01T00:00:00.000Z')

    await checkInUseCase.execute({
      userId: 'user-id',
      gymId: 'gym-id',
    })

    await expect(() =>
      checkInUseCase.execute({
        userId: 'user-id',
        gymId: 'gym-id',
      })
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime('2024-01-01T00:00:00.000Z')

    await checkInUseCase.execute({
      userId: 'user-id',
      gymId: 'gym-id',
    })

    vi.setSystemTime('2024-01-02T00:00:00.000Z')

    const { checkIn } = await checkInUseCase.execute({
      userId: 'user-id',
      gymId: 'gym-id',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
