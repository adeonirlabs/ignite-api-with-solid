import { FetchNearbyGymUseCase } from '~/modules/gym/use-cases/fetch-nearby.usecase'
import { PrismaGymRepository } from '~/repositories/prisma/gym.repository'

export function fetchNearbyGymFactory(): FetchNearbyGymUseCase {
  const gymRepository = new PrismaGymRepository()

  return new FetchNearbyGymUseCase(gymRepository)
}
