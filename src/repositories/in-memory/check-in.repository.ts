import { randomUUID } from 'crypto'
import type { CheckIn, Prisma } from '@prisma/client'
import dayjs from 'dayjs'

import type { CheckInRepository } from '~/repositories/interfaces/check-in.interface'

export class InMemoryCheckInRepository implements CheckInRepository {
  public checkIns: CheckIn[] = []

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

  async findByUserIdAtDate(userId: string, date: Date) {
    const startOfDay = dayjs(date).startOf('date')
    const endOfDay = dayjs(date).endOf('date')

    const alreadyCheckedIn = this.checkIns.find((checkIn) => {
      const checkInDate = dayjs(checkIn.createdAt)

      const isOnSameDate =
        checkInDate.isAfter(startOfDay) && checkInDate.isBefore(endOfDay)

      return checkIn.userId === userId && isOnSameDate
    })

    if (!alreadyCheckedIn) {
      return null
    }

    return alreadyCheckedIn
  }
}
