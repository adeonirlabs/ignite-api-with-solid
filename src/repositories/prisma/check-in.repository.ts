import type { CheckIn, Prisma } from '@prisma/client'
import dayjs from 'dayjs'

import type { CheckInRepository } from '~/repositories/interfaces/check-in.interface'
import { prisma } from '~/services/database'

export class PrismaCheckInRepository implements CheckInRepository {
  async findById(id: string) {
    return await prisma.checkIn.findUnique({
      where: { id },
    })
  }

  async findByUserIdAtDate(userId: string, date: Date) {
    const startOfDay = dayjs(date).startOf('date').toDate()
    const endOfDay = dayjs(date).endOf('date').toDate()

    return await prisma.checkIn.findFirst({
      where: { userId, createdAt: { gte: startOfDay, lte: endOfDay } },
    })
  }

  async findManyByUserId(userId: string, page: number) {
    return await prisma.checkIn.findMany({
      where: { userId },
      skip: (page - 1) * 20,
      take: 20,
    })
  }

  async countByUserId(userId: string) {
    return await prisma.checkIn.count({
      where: { userId },
    })
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    return await prisma.checkIn.create({
      data,
    })
  }

  async save(checkIn: CheckIn) {
    return await prisma.checkIn.update({
      where: { id: checkIn.id },
      data: checkIn,
    })
  }
}
