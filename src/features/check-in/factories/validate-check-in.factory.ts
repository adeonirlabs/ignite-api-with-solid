import { ValidateCheckInUseCase } from '~/features/check-in/use-cases/validate-check-in.usecase'
import { PrismaCheckInRepository } from '~/repositories/prisma/check-in.repository'

export function validateCheckInFactory(): ValidateCheckInUseCase {
  const checkInRepository = new PrismaCheckInRepository()

  return new ValidateCheckInUseCase(checkInRepository)
}
