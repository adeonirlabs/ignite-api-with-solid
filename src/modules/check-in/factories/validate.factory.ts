import { ValidateCheckInUseCase } from '~/modules/check-in/use-cases/validate.usecase'
import { PrismaCheckInRepository } from '~/repositories/prisma/check-in.repository'

export function validateCheckInFactory(): ValidateCheckInUseCase {
  const checkInRepository = new PrismaCheckInRepository()

  return new ValidateCheckInUseCase(checkInRepository)
}
