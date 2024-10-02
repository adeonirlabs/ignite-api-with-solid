import { FetchHistoryUseCase } from '~/features/check-in/use-cases/fetch-history.usecase'
import { PrismaCheckInRepository } from '~/repositories/prisma/check-in.repository'

export function fetchHistoryFactory(): FetchHistoryUseCase {
  const checkInRepository = new PrismaCheckInRepository()

  return new FetchHistoryUseCase(checkInRepository)
}
