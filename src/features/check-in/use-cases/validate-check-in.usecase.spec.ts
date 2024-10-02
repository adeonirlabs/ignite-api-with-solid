import { beforeEach, describe, expect, it } from 'vitest'

import { ValidateCheckInUseCase } from '~/features/check-in/use-cases/validate-check-in.usecase'
import { InMemoryCheckInRepository } from '~/repositories/in-memory/check-in.repository'
import { NotFoundError } from '~/shared/errors/not-found'

describe('Check-in Use Case', () => {
  let checkInRepository: InMemoryCheckInRepository
  let validateCheckInUseCase: ValidateCheckInUseCase

  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    validateCheckInUseCase = new ValidateCheckInUseCase(checkInRepository)
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
})
