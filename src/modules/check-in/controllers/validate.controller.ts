import type { FastifyReply, FastifyRequest } from 'fastify'

import { validateCheckInParamsSchema } from '~/modules/check-in/dtos/validate.dto'
import { validateCheckInFactory } from '~/modules/check-in/factories/validate.factory'

export class ValidateCheckInController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const validateCheckInUseCase = validateCheckInFactory()

    const { checkInId } = validateCheckInParamsSchema.parse(request.params)

    await validateCheckInUseCase.execute({
      checkInId,
    })

    return reply.status(204).send()
  }
}
