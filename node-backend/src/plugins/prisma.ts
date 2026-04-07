import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import { PrismaClient } from '../generated/prisma/index.js'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

const prismaPlugin: FastifyPluginAsync = fp(async (fastify) => {
  const adapter = new PrismaMariaDb({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  })

  const prisma = new PrismaClient({ adapter })

  await prisma.$connect()

  fastify.decorate('prisma', prisma)

  fastify.addHook('onClose', async (fastify) => {
    await fastify.prisma.$disconnect()
  })
})

export default prismaPlugin

// Add TypeScript typing to let it know about fastify.prisma
declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
  }
}
