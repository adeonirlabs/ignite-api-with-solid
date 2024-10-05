import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '~/app'

describe('Profile user controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'john.doe@example.com',
      password: '123456',
    })

    const profileResponse = await request(app.server)
      .get('/profile')
      .set('Authorization', `Bearer ${authResponse.body.token}`)

    expect(profileResponse.status).toBe(200)
    expect(profileResponse.body).toEqual(
      expect.objectContaining({
        email: 'john.doe@example.com',
      })
    )
  })
})
