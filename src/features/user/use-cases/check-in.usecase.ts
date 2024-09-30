import type {
  CheckInRequest,
  CheckInResponse,
} from '~/features/user/dtos/check-in.dto'
import type { CheckInRepository } from '~/repositories/interfaces/check-in.interface'
import type { GymRepository } from '~/repositories/interfaces/gym.interface'
import { NotFoundError } from '~/shared/errors/not-found'

export class CheckInUseCase {
  constructor(
    private readonly checkInRepository: CheckInRepository,
    private readonly gymRepository: GymRepository
  ) {}

  async execute(data: CheckInRequest): Promise<CheckInResponse> {
    const gym = await this.gymRepository.findById(data.gymId)

    if (!gym) {
      throw new NotFoundError('Gym not found')
    }

    const { userId, gymId } = data

    const alreadyCheckedIn = await this.checkInRepository.findByUserIdAtDate(
      userId,
      new Date()
    )

    if (alreadyCheckedIn) {
      throw new Error('User already checked in today')
    }

    const checkIn = await this.checkInRepository.create({
      userId,
      gymId,
    })

    return { checkIn }
  }
}
