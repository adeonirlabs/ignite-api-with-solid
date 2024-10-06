import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '~/app'
import { createAuthUser } from '~/utils/tests/create-auth-user'

describe('Fetch Nearby Gyms controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch nearby gyms', async () => {
    const { token } = await createAuthUser(app, 'admin')

    // Nearby gym
    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'TypeScript Gym',
        description: 'Some description',
        phone: '123456',
        latitude: -29.2974162,
        longitude: -51.5009403,
      })

    // Distant gym
    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'JavaScript Gym',
        description: 'Some description',
        phone: '123456',
        latitude: -29.4400073,
        longitude: -51.5051592,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .set('Authorization', `Bearer ${token}`)
      .query({
        latitude: -29.2974162,
        longitude: -51.5009403,
      })
      .send()

    expect(response.status).toBe(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        name: 'TypeScript Gym',
      }),
    ])
  })
})
