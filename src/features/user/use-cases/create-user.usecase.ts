import { prisma } from '~/shared/services/database'

import type { CreateUserDTO } from '../dtos/create-user.dto'

export async function createUser(data: CreateUserDTO) {
  const { name, email, password } = data

  const userAlreadyExists = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userAlreadyExists) {
    throw new Error('User already exists')
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  })
}
