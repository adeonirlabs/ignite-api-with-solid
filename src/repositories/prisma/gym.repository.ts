import type { Gym, Prisma } from '@prisma/client'

import type { GymRepository } from '~/repositories/interfaces/gym.interface'
import { prisma } from '~/services/database'
import type { Coordinates } from '~/utils/get-distance'

export class PrismaGymRepository implements GymRepository {
  async findById(id: string) {
    return await prisma.gym.findUnique({
      where: { id },
    })
  }

  async searchMany(query: string, page: number) {
    return await prisma.gym.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
      skip: (page - 1) * 20,
      take: 20,
    })
  }

  async findManyNearby(params: Coordinates) {
    return await prisma.$queryRaw<Gym[]>`
      SELECT * FROM gyms
      WHERE (6371 * acos(cos(radians(${params.latitude})) * cos(radians(latitude)) * cos(radians(longitude) - radians(${params.longitude})) + sin(radians(${params.latitude})) * sin(radians(latitude)))) <= 10
    `
  }

  async create(data: Prisma.GymCreateInput) {
    return await prisma.gym.create({
      data,
    })
  }
}
