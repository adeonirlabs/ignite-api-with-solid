import { ProfileUseCase } from '~/modules/user/use-cases/profile.usecase'
import { PrismaUserRepository } from '~/repositories/prisma/user.repository'

export function profileFactory(): ProfileUseCase {
  const userRepository = new PrismaUserRepository()

  return new ProfileUseCase(userRepository)
}
