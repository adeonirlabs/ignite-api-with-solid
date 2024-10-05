import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '~/app'

describe('Create gym controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'john.doe@example.com',
      password: '123456',
    })

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send({
        name: 'John Doe',
        description: 'John Doe',
        phone: '123456',
        latitude: -29.297956,
        longitude: -51.500644,
      })

    expect(response.status).toBe(201)
  })
})
