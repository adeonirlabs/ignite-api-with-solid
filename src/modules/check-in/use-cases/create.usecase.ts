import { NotFoundError } from '~/errors/not-found'
import type {
  CreateCheckInRequest,
  CreateCheckInResponse,
} from '~/modules/check-in/dtos/create.dto'
import type { CheckInRepository } from '~/repositories/interfaces/check-in.interface'
import type { GymRepository } from '~/repositories/interfaces/gym.interface'
import { getDistance } from '~/utils/get-distance'

export class CreateCheckInUseCase {
  constructor(
    private readonly checkInRepository: CheckInRepository,
    private readonly gymRepository: GymRepository
  ) {}

  async execute(data: CreateCheckInRequest): Promise<CreateCheckInResponse> {
    const { userId, gymId, userLatitude, userLongitude } = data

    const gym = await this.gymRepository.findById(gymId)

    if (!gym) {
      throw new NotFoundError('Gym not found')
    }

    const distance = getDistance(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      }
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new Error('User is too far from gym')
    }

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
