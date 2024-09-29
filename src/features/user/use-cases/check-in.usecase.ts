import type {
  CheckInRequest,
  CheckInResponse,
} from '~/features/user/dtos/check-in.dto'
import type { CheckInRepository } from '~/repositories/interfaces/check-in.interface'

export class CheckInUseCase {
  constructor(private readonly checkInRepository: CheckInRepository) {}

  async execute(data: CheckInRequest): Promise<CheckInResponse> {
    const { userId, gymId } = data

    const checkIn = await this.checkInRepository.create({
      userId,
      gymId,
    })

    return { checkIn }
  }
}
