import { AuthenticateUseCase } from '~/modules/user/use-cases/authenticate.usecase'
import { PrismaUserRepository } from '~/repositories/prisma/user.repository'

export function authenticateFactory(): AuthenticateUseCase {
  const userRepository = new PrismaUserRepository()

  return new AuthenticateUseCase(userRepository)
}
