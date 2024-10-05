import dayjs from 'dayjs'
import { ConflictError } from '~/errors/conflict.error'
import { NotFoundError } from '~/errors/not-found'
import type {
  ValidateCheckInRequest,
  ValidateCheckInResponse,
} from '~/modules/check-in/dtos/validate.dto'
import type { CheckInRepository } from '~/repositories/interfaces/check-in.interface'

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

    const TWENTY_MINUTES = 20

    const distanceInMinutes = dayjs(new Date()).diff(
      checkIn.createdAt,
      'minutes'
    )

    if (distanceInMinutes > TWENTY_MINUTES) {
      throw new ConflictError(
        'Check-in can only be validated within 20 minutes'
      )
    }

    checkIn.validatedAt = new Date()

    await this.checkInRepository.save(checkIn)

    return { checkIn }
  }
}
