import { compare } from 'bcryptjs'

import { UnauthorizedError } from '~/errors/unauthorized.error'
import type {
  AuthenticateRequest,
  AuthenticateResponse,
} from '~/modules/user/dtos/authenticate.dto'
import type { UserRepository } from '~/repositories/interfaces/user.interface'

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
