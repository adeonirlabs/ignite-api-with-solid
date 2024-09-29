import { compare } from 'bcryptjs'

import type {
  AuthenticateRequest,
  AuthenticateResponse,
} from '~/features/user/dtos/authenticate.dto'
import type { UserRepository } from '~/repositories/interfaces/user.interface'
import { UnauthorizedError } from '~/shared/errors/unauthorized.error'

export class AuthenticateUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: AuthenticateRequest): Promise<AuthenticateResponse> {
    const { email, password } = data

    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new UnauthorizedError('Invalid credentials')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new UnauthorizedError('Invalid credentials')
    }

    return { user }
  }
}
