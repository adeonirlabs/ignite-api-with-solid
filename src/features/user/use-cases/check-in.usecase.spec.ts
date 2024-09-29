import { beforeEach, describe, expect, it } from 'vitest'

import { CheckInUseCase } from '~/features/user/use-cases/check-in.usecase'
import { InMemoryCheckInRepository } from '~/repositories/in-memory/check-in.repository'

describe('Check-in Use Case', () => {
  let checkInRepository: InMemoryCheckInRepository
  let checkInUseCase: CheckInUseCase

  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    checkInUseCase = new CheckInUseCase(checkInRepository)
  })

  it('should be able to check in', async () => {
    const { checkIn } = await checkInUseCase.execute({
      userId: 'user-id',
      gymId: 'gym-id',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
