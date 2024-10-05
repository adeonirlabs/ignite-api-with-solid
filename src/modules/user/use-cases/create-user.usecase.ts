import { hash } from 'bcryptjs'

import type {
  CreateUserRequest,
  CreateUserResponse,
} from '~/modules/user/dtos/create-user.dto'
import type { UserRepository } from '~/repositories/interfaces/user.interface'
import { ConflictError } from '~/shared/errors/conflict.error'

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: CreateUserRequest): Promise<CreateUserResponse> {
    const { name, email, password } = data

    const userAlreadyExists = await this.userRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new ConflictError('User already exists')
    }

    const hashedPassword = await hash(password, 8)

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    return { user }
  }
}
