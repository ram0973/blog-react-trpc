import { PrismaClient } from '@prisma/client'
export const prisma = new PrismaClient()

export const createAppContext = () => {
  return {
    prisma,
    stop: async () => {
      await prisma.$disconnect()
    },
  }
}

export type AppContext = ReturnType<typeof createAppContext>
