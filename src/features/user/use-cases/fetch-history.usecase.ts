import type {
  FetchCheckInHistoryRequest,
  FetchCheckInHistoryResponse,
} from '~/features/user/dtos/fetch-history.dto'
import type { CheckInRepository } from '~/repositories/interfaces/check-in.interface'

export class FetchCheckInHistoryUseCase {
  constructor(private readonly checkInRepository: CheckInRepository) {}

  async execute(
    data: FetchCheckInHistoryRequest
  ): Promise<FetchCheckInHistoryResponse> {
    const { userId, page } = data

    const checkIns = await this.checkInRepository.findManyByUserId(userId, page)

    return { checkIns }
  }
}
