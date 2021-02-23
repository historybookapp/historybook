import { PrismaClient, Prisma } from '@prisma/client'

import { singletonSync } from './singleton'

const prisma = singletonSync('prisma', () => {
  return new PrismaClient()
})

export default prisma
export { Prisma }
