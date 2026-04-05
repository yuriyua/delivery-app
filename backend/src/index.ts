import Fastify from 'fastify'
import 'dotenv/config'
import fastifyJwt from '@fastify/jwt'
import fastifyCors from '@fastify/cors'
import prismaPlugin from './plugins/prisma.js'
import authRoutes from './routes/auth.js'

const fastify = Fastify({
  logger: true
})

// Register database first to ensure other plugins can use it
fastify.register(prismaPlugin)

// Register authentication routes with prefix
fastify.register(authRoutes, { prefix: '/api/auth' })

// Register CORS to allow frontend communication
fastify.register(fastifyCors, {
  origin: true // In development allow all, restrict later
})

// Register JWT for token signing and verification
fastify.register(fastifyJwt, {
  secret: process.env.JWT_SECRET
})

fastify.get('/', async (request, reply) => {
  return {
    status: 'ok',
    message: 'API is running!',
    environment: process.env.NODE_ENV
  }
})

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3000

    await fastify.listen({
      port,
      host: '0.0.0.0'
    })

    console.log(`🚀 Server ready at http://localhost:${port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
