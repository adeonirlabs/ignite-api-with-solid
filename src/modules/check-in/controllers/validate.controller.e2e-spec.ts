import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '~/app'
import { prisma } from '~/services/database'
import { createAuthUser } from '~/utils/tests/create-auth-user'

describe('Validate check in controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to validate a check in', async () => {
    const { token } = await createAuthUser(app, 'admin')

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        name: 'TypeScript Gym',
        latitude: -29.297956,
        longitude: -51.500644,
      },
    })

    const checkIn = await prisma.checkIn.create({
      data: {
        gymId: gym.id,
        userId: user.id,
      },
    })

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toBe(204)

    const updatedCheckIn = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: checkIn.id,
      },
    })

    expect(updatedCheckIn.validatedAt).not.toBeNull()
    expect(updatedCheckIn.validatedAt).toBeInstanceOf(Date)
  })
})
