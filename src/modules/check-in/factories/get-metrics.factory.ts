import { GetMetricsUseCase } from '~/modules/check-in/use-cases/get-metrics.usecase'
import { PrismaCheckInRepository } from '~/repositories/prisma/check-in.repository'

export function getMetricsFactory(): GetMetricsUseCase {
  const checkInRepository = new PrismaCheckInRepository()

  return new GetMetricsUseCase(checkInRepository)
}
