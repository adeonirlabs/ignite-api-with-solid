import { SearchGymUseCase } from '~/modules/gym/use-cases/search-gym.usecase'
import { PrismaGymRepository } from '~/repositories/prisma/gym.repository'

export function searchGymFactory(): SearchGymUseCase {
  const gymRepository = new PrismaGymRepository()

  return new SearchGymUseCase(gymRepository)
}
