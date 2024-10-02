import type {
  GetUserMetricsRequest,
  GetUserMetricsResponse,
} from '~/features/user/dtos/get-user-metrics.dto'
import type { CheckInRepository } from '~/repositories/interfaces/check-in.interface'

export class GetUserMetricsUseCase {
  constructor(private readonly checkInRepository: CheckInRepository) {}

  async execute(data: GetUserMetricsRequest): Promise<GetUserMetricsResponse> {
    const { userId } = data

    const count = await this.checkInRepository.countByUserId(userId)

    return { count }
  }
}
