import type {
  FetchHistoryRequest,
  FetchHistoryResponse,
} from '~/features/check-in/dtos/fetch-history.dto'
import type { CheckInRepository } from '~/repositories/interfaces/check-in.interface'

export class FetchHistoryUseCase {
  constructor(private readonly checkInRepository: CheckInRepository) {}

  async execute(data: FetchHistoryRequest): Promise<FetchHistoryResponse> {
    const { userId, page } = data

    const checkIns = await this.checkInRepository.findManyByUserId(userId, page)

    return { checkIns }
  }
}
