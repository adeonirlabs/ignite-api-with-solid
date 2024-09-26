import { hash } from 'bcryptjs'

import type { CreateUserDTO } from '~/features/user/dtos/create-user.dto'
import { UserRepository } from '~/features/user/repositories/user.repository'
import { prisma } from '~/shared/services/database'

export async function createUser(data: CreateUserDTO) {
  const userRepository = new UserRepository()
  const { name, email, password } = data

  const userAlreadyExists = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userAlreadyExists) {
    throw new Error('User already exists')
  }

  const hashedPassword = await hash(password, 8)

  const user = await userRepository.create({
    name,
    email,
    password: hashedPassword,
  })

  return user
}
