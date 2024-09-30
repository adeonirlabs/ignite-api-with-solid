import { Decimal } from '@prisma/client/runtime/library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { CheckInUseCase } from '~/features/user/use-cases/check-in.usecase'
import { InMemoryCheckInRepository } from '~/repositories/in-memory/check-in.repository'
import { InMemoryGymRepository } from '~/repositories/in-memory/gym.repository'

describe('Check-in Use Case', () => {
  let checkInRepository: InMemoryCheckInRepository
  let gymRepository: InMemoryGymRepository
  let checkInUseCase: CheckInUseCase

  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    gymRepository = new InMemoryGymRepository()
    checkInUseCase = new CheckInUseCase(checkInRepository, gymRepository)

    gymRepository.gyms.push({
      id: 'gym-id',
      name: 'Gym',
      description: null,
      phone: null,
      latitude: new Decimal(0),
      longitude: new Decimal(0),
      createdAt: new Date(),
    })

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
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime('2024-01-01T00:00:00.000Z')

    await checkInUseCase.execute({
      userId: 'user-id',
      gymId: 'gym-id',
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(() =>
      checkInUseCase.execute({
        userId: 'user-id',
        gymId: 'gym-id',
        userLatitude: 0,
        userLongitude: 0,
      })
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime('2024-01-01T00:00:00.000Z')

    await checkInUseCase.execute({
      userId: 'user-id',
      gymId: 'gym-id',
      userLatitude: 0,
      userLongitude: 0,
    })

    vi.setSystemTime('2024-01-02T00:00:00.000Z')

    const { checkIn } = await checkInUseCase.execute({
      userId: 'user-id',
      gymId: 'gym-id',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
