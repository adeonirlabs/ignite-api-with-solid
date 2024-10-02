import { randomUUID } from 'crypto'
import type { CheckIn, Prisma } from '@prisma/client'
import dayjs from 'dayjs'

import type { CheckInRepository } from '~/repositories/interfaces/check-in.interface'

export class InMemoryCheckInRepository implements CheckInRepository {
  public checkIns: CheckIn[] = []

  async findById(id: string) {
    return this.checkIns.find((checkIn) => checkIn.id === id) || null
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

  async findManyByUserId(userId: string, page: number) {
    return this.checkIns
      .filter((checkIn) => checkIn.userId === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async countByUserId(userId: string) {
    return this.checkIns.filter((checkIn) => checkIn.userId === userId).length
  }

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

  async save(checkIn: CheckIn) {
    const checkInIndex = this.checkIns.findIndex(
      (item) => item.id === checkIn.id
    )

    if (checkInIndex >= 0) {
      this.checkIns[checkInIndex] = checkIn
    }

    return checkIn
  }
}
