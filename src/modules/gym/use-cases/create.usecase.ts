import type {
  CreateGymRequest,
  CreateGymResponse,
} from '~/modules/gym/dtos/create.dto'
import type { GymRepository } from '~/repositories/interfaces/gym.interface'

export class CreateGymUseCase {
  constructor(private readonly gymRepository: GymRepository) {}

  async execute(data: CreateGymRequest): Promise<CreateGymResponse> {
    const { name, description, phone, latitude, longitude } = data

    const gym = await this.gymRepository.create({
      name,
      description,
      phone,
      latitude,
      longitude,
    })

    return { gym }
  }
}
