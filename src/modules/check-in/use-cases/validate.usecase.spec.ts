import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { ConflictError } from '~/errors/conflict.error'
import { NotFoundError } from '~/errors/not-found'
import { ValidateCheckInUseCase } from '~/modules/check-in/use-cases/validate.usecase'
import { InMemoryCheckInRepository } from '~/repositories/in-memory/check-in.repository'

describe('Check-in Use Case', () => {
  let checkInRepository: InMemoryCheckInRepository
  let validateCheckInUseCase: ValidateCheckInUseCase

  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    validateCheckInUseCase = new ValidateCheckInUseCase(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInRepository.create({
      userId: 'user-1',
      gymId: 'gym-1',
    })

    const { checkIn } = await validateCheckInUseCase.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validatedAt).toEqual(expect.any(Date))
    expect(checkIn.id).toEqual(createdCheckIn.id)
  })

  it('should not be able to validate an inexistent check-in', async () => {
    await expect(
      validateCheckInUseCase.execute({
        checkInId: 'inexistent-check-in-id',
      })
    ).rejects.toBeInstanceOf(NotFoundError)
  })

  it('should not be able to validate the check-in after 20 minutes', async () => {
    vi.setSystemTime('2024-01-01T13:40:00.000Z')

    const createdCheckIn = await checkInRepository.create({
      userId: 'user-1',
      gymId: 'gym-1',
    })

    const TWENTY_ONE_MINUTES_IN_MS = 1000 * 60 * 21

    vi.advanceTimersByTime(TWENTY_ONE_MINUTES_IN_MS)

    await expect(
      validateCheckInUseCase.execute({
        checkInId: createdCheckIn.id,
      })
    ).rejects.toBeInstanceOf(ConflictError)
  })
})
