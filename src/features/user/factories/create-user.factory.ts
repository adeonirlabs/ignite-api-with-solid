import { CreateUserUseCase } from '~/features/user/use-cases/create-user.usecase'
import { PrismaUserRepository } from '~/repositories/prisma/user.repository'

export function createUserFactory(): CreateUserUseCase {
  const userRepository = new PrismaUserRepository()

  return new CreateUserUseCase(userRepository)
}
