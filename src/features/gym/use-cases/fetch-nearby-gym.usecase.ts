import type {
  FetchNearbyGymRequest,
  FetchNearbyGymResponse,
} from '~/features/gym/dtos/fetch-nearby-gym.dto'
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
