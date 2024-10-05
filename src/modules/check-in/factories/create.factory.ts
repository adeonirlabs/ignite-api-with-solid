import { CreateCheckInUseCase } from '~/modules/check-in/use-cases/create.usecase'
import { PrismaCheckInRepository } from '~/repositories/prisma/check-in.repository'
import { PrismaGymRepository } from '~/repositories/prisma/gym.repository'

export function createCheckInFactory(): CreateCheckInUseCase {
  const checkInRepository = new PrismaCheckInRepository()
  const gymRepository = new PrismaGymRepository()

  return new CreateCheckInUseCase(checkInRepository, gymRepository)
}
