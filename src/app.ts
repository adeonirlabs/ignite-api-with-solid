import { fastify } from 'fastify'
import { ZodError } from 'zod'

import { env } from '~/config/env'
import { routes } from '~/routes'

export const app = fastify()

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
