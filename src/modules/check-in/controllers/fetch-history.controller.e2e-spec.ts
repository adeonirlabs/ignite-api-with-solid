import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '~/app'
import { prisma } from '~/services/database'
import { createAuthUser } from '~/utils/tests/create-auth-user'

describe('Fetch history controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch history of check ins', async () => {
    const { token } = await createAuthUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        name: 'TypeScript Gym',
        latitude: -29.297956,
        longitude: -51.500644,
      },
    })

    await prisma.checkIn.createMany({
      data: [
        {
          gymId: gym.id,
          userId: user.id,
        },
        {
          gymId: gym.id,
          userId: user.id,
        },
      ],
    })

    const response = await request(app.server)
      .get('/check-ins/history')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body.checkIns).toHaveLength(2)
  })
})
