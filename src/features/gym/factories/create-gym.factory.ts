import { CreateGymUseCase } from '~/features/gym/use-cases/create-gym.usecase'
import { PrismaGymRepository } from '~/repositories/prisma/gym.repository'

export function createGymFactory(): CreateGymUseCase {
  const gymRepository = new PrismaGymRepository()

  return new CreateGymUseCase(gymRepository)
}
