import type {
  SearchGymRequest,
  SearchGymResponse,
} from '~/features/gym/dtos/search-gym.dto'
import type { GymRepository } from '~/repositories/interfaces/gym.interface'

export class SearchGymUseCase {
  constructor(private readonly gymRepository: GymRepository) {}

  async execute(data: SearchGymRequest): Promise<SearchGymResponse> {
    const { query, page } = data

    const gyms = await this.gymRepository.searchMany(query, page)

    return { gyms }
  }
}
