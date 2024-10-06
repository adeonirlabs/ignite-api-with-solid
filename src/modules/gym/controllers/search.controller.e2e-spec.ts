import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '~/app'
import { createAuthUser } from '~/utils/tests/create-auth-user'

describe('Search gym controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search gyms by name', async () => {
    const { token } = await createAuthUser(app, 'admin')

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'JavaScript Gym',
        description: 'Some description',
        phone: '123456',
        latitude: -29.297956,
        longitude: -51.500644,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'TypeScript Gym',
        description: 'Some description',
        phone: '123456',
        latitude: -29.297956,
        longitude: -51.500644,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .set('Authorization', `Bearer ${token}`)
      .query({
        query: 'TypeScript',
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
