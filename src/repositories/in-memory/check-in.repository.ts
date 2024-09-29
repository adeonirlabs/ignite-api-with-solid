import { randomUUID } from 'crypto'
import type { CheckIn, Prisma } from '@prisma/client'

import type { CheckInRepository } from '~/repositories/interfaces/check-in.interface'

export class InMemoryCheckInRepository implements CheckInRepository {
  private checkIns: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      userId: data.userId,
      gymId: data.gymId,
      validatedAt: data.validatedAt ? new Date(data.validatedAt) : null,
      createdAt: new Date(),
    }

    this.checkIns.push(checkIn)

    return checkIn
  }
}
