import type { CreateUserDTO } from '~/features/user/dtos/create-user.dto'
import { prisma } from '~/shared/services/database'

export class UserRepository {
  async create(data: CreateUserDTO) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
