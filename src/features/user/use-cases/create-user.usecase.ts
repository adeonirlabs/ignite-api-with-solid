import { hash } from 'bcryptjs'

import type { CreateUserDTO } from '~/features/user/dtos/create-user.dto'
import type { UserRepository } from '~/features/user/repositories/user.repository'

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: CreateUserDTO) {
    const { name, email, password } = data

    const userAlreadyExists = await this.userRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    const hashedPassword = await hash(password, 8)

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    return user
  }
}
