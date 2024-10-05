import type {
  ProfileRequest,
  ProfileResponse,
} from '~/modules/user/dtos/profile.dto'

import { NotFoundError } from '~/errors/not-found'
import type { UserRepository } from '~/repositories/interfaces/user.interface'

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
