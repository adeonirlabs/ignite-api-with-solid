import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import { fastify } from 'fastify'
import { ZodError } from 'zod'

import { env } from '~/configs/env'
import { routes } from '~/routes'

const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(routes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should send the error to an external tool like Sentry, Datadog, etc.
  }

  return reply.status(500).send({ message: 'Internal server error' })
})

export { app }
