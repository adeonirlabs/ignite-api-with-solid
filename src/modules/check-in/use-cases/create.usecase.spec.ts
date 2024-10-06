import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { CreateCheckInUseCase } from '~/modules/check-in/use-cases/create.usecase'
import { InMemoryCheckInRepository } from '~/repositories/in-memory/check-in.repository'
import { InMemoryGymRepository } from '~/repositories/in-memory/gym.repository'

describe('Check-in Use Case', () => {
  let checkInRepository: InMemoryCheckInRepository
  let gymRepository: InMemoryGymRepository
  let createCheckInUseCase: CreateCheckInUseCase

  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    gymRepository = new InMemoryGymRepository()
    createCheckInUseCase = new CreateCheckInUseCase(
      checkInRepository,
      gymRepository
    )

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
    const { checkIn } = await createCheckInUseCase.execute({
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

    await expect(
      createCheckInUseCase.execute({
        userId: 'user-1',
        gymId: 'gym-2',
        userLatitude: -29.297956,
        userLongitude: -51.500644,
      })
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to check in on a different gym', async () => {
    await gymRepository.create({
      id: 'gym-2',
      name: 'Gym 2',
      description: null,
      phone: null,
      latitude: -29.295474,
      longitude: -51.500698,
    })

    await expect(
      createCheckInUseCase.execute({
        userId: 'user-1',
        gymId: 'gym-2',
        userLatitude: -29.297956,
        userLongitude: -51.500644,
      })
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2024, 0, 1, 8, 0, 0))

    await createCheckInUseCase.execute({
      userId: 'user-1',
      gymId: 'gym-1',
      userLatitude: -29.297956,
      userLongitude: -51.500644,
    })

    await expect(
      createCheckInUseCase.execute({
        userId: 'user-1',
        gymId: 'gym-1',
        userLatitude: -29.297956,
        userLongitude: -51.500644,
      })
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2024, 0, 1, 8, 0, 0))

    await createCheckInUseCase.execute({
      userId: 'user-1',
      gymId: 'gym-1',
      userLatitude: -29.297956,
      userLongitude: -51.500644,
    })

    vi.setSystemTime(new Date(2024, 0, 2, 8, 0, 0))

    const { checkIn } = await createCheckInUseCase.execute({
      userId: 'user-1',
      gymId: 'gym-1',
      userLatitude: -29.297956,
      userLongitude: -51.500644,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
