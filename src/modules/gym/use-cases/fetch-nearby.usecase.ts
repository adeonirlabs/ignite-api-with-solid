import type {
  FetchNearbyGymRequest,
  FetchNearbyGymResponse,
} from '~/modules/gym/dtos/fetch-nearby.dto'
import type { GymRepository } from '~/repositories/interfaces/gym.interface'

export class FetchNearbyGymUseCase {
  constructor(private readonly gymRepository: GymRepository) {}

  async execute(data: FetchNearbyGymRequest): Promise<FetchNearbyGymResponse> {
    const { userLatitude, userLongitude } = data

    const gyms = await this.gymRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { gyms }
  }
}
