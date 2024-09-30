import type { CheckIn, Prisma } from '@prisma/client'

export interface CheckInRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdAtDate(userId: string, date: Date): Promise<CheckIn | null>
}
