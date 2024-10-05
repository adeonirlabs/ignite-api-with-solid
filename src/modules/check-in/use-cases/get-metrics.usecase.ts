import type {
  GetMetricsRequest,
  GetMetricsResponse,
} from '~/modules/check-in/dtos/get-metrics.dto'
import type { CheckInRepository } from '~/repositories/interfaces/check-in.interface'

export class GetMetricsUseCase {
  constructor(private readonly checkInRepository: CheckInRepository) {}

  async execute(data: GetMetricsRequest): Promise<GetMetricsResponse> {
    const { userId } = data

    const count = await this.checkInRepository.countByUserId(userId)

    return { count }
  }
}
