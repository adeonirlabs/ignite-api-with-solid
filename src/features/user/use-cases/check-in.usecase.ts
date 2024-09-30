import type {
  CheckInRequest,
  CheckInResponse,
} from '~/features/user/dtos/check-in.dto'
import type { CheckInRepository } from '~/repositories/interfaces/check-in.interface'

export class CheckInUseCase {
  constructor(private readonly checkInRepository: CheckInRepository) {}

  async execute(data: CheckInRequest): Promise<CheckInResponse> {
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
