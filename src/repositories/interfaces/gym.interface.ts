import type { Gym, Prisma } from '@prisma/client'

import type { Coordinates } from '~/utils/get-distance'

export interface GymRepository {
  findById(id: string): Promise<Gym | null>
  searchMany(query: string, page: number): Promise<Gym[]>
  findManyNearby(params: Coordinates): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
