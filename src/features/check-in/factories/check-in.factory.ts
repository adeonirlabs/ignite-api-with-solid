import { CheckInUseCase } from '~/features/check-in/use-cases/check-in.usecase'
import { PrismaCheckInRepository } from '~/repositories/prisma/check-in.repository'
import { PrismaGymRepository } from '~/repositories/prisma/gym.repository'

export function checkInFactory(): CheckInUseCase {
  const checkInRepository = new PrismaCheckInRepository()
  const gymRepository = new PrismaGymRepository()

  return new CheckInUseCase(checkInRepository, gymRepository)
}
