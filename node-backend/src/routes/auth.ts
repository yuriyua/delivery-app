import { FastifyPluginAsync } from 'fastify'
import { z } from 'zod'
import bcrypt from 'bcrypt'

// Validation schema for incoming data (Zod)
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

const authRoutes: FastifyPluginAsync = async (fastify) => {
  // Route for login
  fastify.post('/login', async (request, reply) => {
    // 1. Validate incoming data
    const result = loginSchema.safeParse(request.body)
    if (!result.success) {
      return reply.status(400).send({
        error: 'Invalid input',
        details: result.error.format()
      })
    }

    const { email, password } = result.data

    try {
      // 2. Find user in database
      const user = await fastify.prisma.user.findUnique({
        where: { email }
      })

      if (!user) {
        return reply.status(401).send({ error: 'User not found' })
      }

      // 3. Compare passwords using bcrypt
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return reply.status(401).send({ error: 'Incorrect password' })
      }

      // 4. Generate JWT token
      const token = fastify.jwt.sign({
        id: user.id,
        email: user.email,
        name: user.name
      })

      return {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      }
    } catch (error) {
      fastify.log.error(error)
      return reply.status(500).send({ error: 'Internal server error' })
    }
  })
}

export default authRoutes
