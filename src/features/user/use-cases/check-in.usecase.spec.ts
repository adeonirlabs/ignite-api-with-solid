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

    await gymRepository.create({
      id: 'gym-1',
      name: 'Gym 1',
      description: null,
      phone: null,
      latitude: -29.297956,
      longitude: -51.500644,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await checkInUseCase.execute({
      userId: 'user-1',
      gymId: 'gym-1',
      userLatitude: -29.297956,
      userLongitude: -51.500644,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    await gymRepository.create({
      id: 'gym-2',
      name: 'Gym 2',
      description: null,
      phone: null,
      latitude: -29.295474,
      longitude: -51.500698,
    })

    await expect(() =>
      checkInUseCase.execute({
        userId: 'user-1',
        gymId: 'gym-2',
        userLatitude: -29.297956,
        userLongitude: -51.500644,
      })
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime('2024-01-01T00:00:00.000Z')

    await checkInUseCase.execute({
      userId: 'user-1',
      gymId: 'gym-1',
      userLatitude: -29.297956,
      userLongitude: -51.500644,
    })

    await expect(() =>
      checkInUseCase.execute({
        userId: 'user-1',
        gymId: 'gym-1',
        userLatitude: -29.297956,
        userLongitude: -51.500644,
      })
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime('2024-01-01T00:00:00.000Z')

    await checkInUseCase.execute({
      userId: 'user-1',
      gymId: 'gym-1',
      userLatitude: -29.297956,
      userLongitude: -51.500644,
    })

    vi.setSystemTime('2024-01-02T00:00:00.000Z')

    const { checkIn } = await checkInUseCase.execute({
      userId: 'user-1',
      gymId: 'gym-1',
      userLatitude: -29.297956,
      userLongitude: -51.500644,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
