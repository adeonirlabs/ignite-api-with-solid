import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '~/app'

describe('Refresh user controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a user token', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'john.doe@example.com',
      password: '123456',
    })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/refresh')
      .set('Cookie', cookies as string[])
      .send()

    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken'),
    ])

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
