import { CreateUserUseCase } from '~/modules/user/use-cases/create.usecase'
import { PrismaUserRepository } from '~/repositories/prisma/user.repository'

export function createUserFactory(): CreateUserUseCase {
  const userRepository = new PrismaUserRepository()

  return new CreateUserUseCase(userRepository)
}
