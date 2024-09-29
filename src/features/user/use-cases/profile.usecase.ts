import type {
  ProfileRequest,
  ProfileResponse,
} from '~/features/user/dtos/profile.dto'

import type { UserRepository } from '~/repositories/interfaces/user.interface'
import { NotFoundError } from '~/shared/errors/not-found'

export class ProfileUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: ProfileRequest): Promise<ProfileResponse> {
    const { userId } = data

    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new NotFoundError('User not found')
    }

    return { user }
  }
}
