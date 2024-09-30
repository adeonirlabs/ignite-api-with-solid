import { randomUUID } from 'crypto'
import type { Gym, Prisma } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

import type { GymRepository } from '~/repositories/interfaces/gym.interface'

export class InMemoryGymRepository implements GymRepository {
  public gyms: Gym[] = []

  async findById(id: string) {
    return this.gyms.find((gym) => gym.id === id) ?? null
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: randomUUID(),
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
