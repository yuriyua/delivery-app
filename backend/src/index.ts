import Fastify from 'fastify'
import 'dotenv/config'

const fastify = Fastify({
  logger: true
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
