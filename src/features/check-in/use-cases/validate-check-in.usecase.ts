import type {
  ValidateCheckInRequest,
  ValidateCheckInResponse,
} from '~/features/check-in/dtos/validate-check-in.dto'
import type { CheckInRepository } from '~/repositories/interfaces/check-in.interface'
import { NotFoundError } from '~/shared/errors/not-found'

export class ValidateCheckInUseCase {
  constructor(private readonly checkInRepository: CheckInRepository) {}

  async execute(
    data: ValidateCheckInRequest
  ): Promise<ValidateCheckInResponse> {
    const { checkInId } = data

    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) {
      throw new NotFoundError('Check-in not found')
    }

    checkIn.validatedAt = new Date()

    await this.checkInRepository.save(checkIn)

    return { checkIn }
  }
}
