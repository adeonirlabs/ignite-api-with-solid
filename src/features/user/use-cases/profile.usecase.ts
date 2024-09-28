import type { ProfileRequest } from '~/features/user/dtos/profile.dto'

import type { UserRepository } from '~/repositories/interfaces/user-repository'
import { NotFoundError } from '~/shared/errors/not-found'

export class ProfileUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: ProfileRequest) {
    const { userId } = data

    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new NotFoundError('User not found')
    }

    return { user }
  }
}
