import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '~/app'

describe('Search gym controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search gyms', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'john.doe@example.com',
      password: '123456',
    })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send({
        name: 'Gym 1',
        phone: '123456',
        latitude: -29.297956,
        longitude: -51.500644,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send({
        query: 'Gym 1',
        page: 1,
      })

    expect(response.status).toBe(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        name: 'Gym 1',
      }),
    ])
  })
})
