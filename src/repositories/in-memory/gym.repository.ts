import type { Gym } from '@prisma/client'

import type { GymRepository } from '~/repositories/interfaces/gym.interface'

export class InMemoryGymRepository implements GymRepository {
  public gyms: Gym[] = []

  async findById(id: string) {
    return this.gyms.find((gym) => gym.id === id) ?? null
  }
}
