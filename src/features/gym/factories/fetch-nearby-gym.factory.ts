import { FetchNearbyGymUseCase } from '~/features/gym/use-cases/fetch-nearby-gym.usecase'
import { PrismaGymRepository } from '~/repositories/prisma/gym.repository'

export function fetchNearbyGymFactory(): FetchNearbyGymUseCase {
  const gymRepository = new PrismaGymRepository()

  return new FetchNearbyGymUseCase(gymRepository)
}
