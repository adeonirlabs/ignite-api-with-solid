import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '~/app'
import { createAuthUser } from '~/utils/tests/create-auth-user'

describe('Profile user controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
    const { token } = await createAuthUser(app)

    const profileResponse = await request(app.server)
      .get('/profile')
      .set('Authorization', `Bearer ${token}`)

    expect(profileResponse.status).toBe(200)
    expect(profileResponse.body).toEqual(
      expect.objectContaining({
        email: 'john.doe@example.com',
      })
    )
  })
})
