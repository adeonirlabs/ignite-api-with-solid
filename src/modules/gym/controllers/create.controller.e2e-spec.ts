import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '~/app'
import { createAuthUser } from '~/utils/tests/create-auth-user'

describe('Create gym controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    const { token } = await createAuthUser(app, 'admin')

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'TypeScript Gym',
        description: 'Some description',
        phone: '123456',
        latitude: -29.297956,
        longitude: -51.500644,
      })

    expect(response.status).toBe(201)
  })
})
