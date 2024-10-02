import { randomUUID } from 'crypto'
import type { Gym, Prisma } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

import type { GymRepository } from '~/repositories/interfaces/gym.interface'
import { type Coordinates, getDistance } from '~/utils/get-distance'

export class InMemoryGymRepository implements GymRepository {
  public gyms: Gym[] = []

  async findById(id: string) {
    return this.gyms.find((gym) => gym.id === id) ?? null
  }

  async searchMany(query: string, page: number) {
    return this.gyms
      .filter((gym) => gym.name.toLowerCase().includes(query.toLowerCase()))
      .slice((page - 1) * 20, page * 20)
  }

  async findManyNearby(params: Coordinates) {
    return this.gyms.filter((gym) => {
      const distance = getDistance(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: gym.latitude.toNumber(),
          longitude: gym.longitude.toNumber(),
        }
      )

      const MAX_DISTANCE_IN_KILOMETERS = 10

      return distance < MAX_DISTANCE_IN_KILOMETERS
    })
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
      createdAt: new Date(),
    }

    this.gyms.push(gym)

    return gym
  }
}
