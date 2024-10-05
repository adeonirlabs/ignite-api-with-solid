import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '~/app'
import { prisma } from '~/services/database'
import { createAuthUser } from '~/utils/tests/create-auth-user'

describe('Create check in controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check in', async () => {
    const { token } = await createAuthUser(app)

    const gym = await prisma.gym.create({
      data: {
        name: 'TypeScript Gym',
        latitude: -29.297956,
        longitude: -51.500644,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -29.297956,
        longitude: -51.500644,
      })

    expect(response.status).toBe(201)
  })
})
