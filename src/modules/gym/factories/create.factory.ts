import { CreateGymUseCase } from '~/modules/gym/use-cases/create.usecase'
import { PrismaGymRepository } from '~/repositories/prisma/gym.repository'

export function createGymFactory(): CreateGymUseCase {
  const gymRepository = new PrismaGymRepository()

  return new CreateGymUseCase(gymRepository)
}
