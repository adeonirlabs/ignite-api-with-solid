import { GetUserMetricsUseCase } from '~/features/check-in/use-cases/get-user-metrics.usecase'
import { PrismaCheckInRepository } from '~/repositories/prisma/check-in.repository'

export function getUserMetricsFactory(): GetUserMetricsUseCase {
  const checkInRepository = new PrismaCheckInRepository()

  return new GetUserMetricsUseCase(checkInRepository)
}
