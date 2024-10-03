import { app } from '~/app'
import { env } from '~/configs/env'

app
  .listen({
    host: env.HOST,
    port: env.PORT,
  })
  .then(() => {
    console.log(`Server running on ${env.BASE_URL}`)
  })
