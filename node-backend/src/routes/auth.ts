import { FastifyPluginAsync } from 'fastify'
import { z } from 'zod'
import bcrypt from 'bcrypt'

// Validation schema for incoming data (Zod)
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

const registerSchema = z.object({
  name: z.string().min(2),
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

  // Route for registration
  fastify.post('/register', async (request, reply) => {
    // 1. Validate incoming data
    const result = registerSchema.safeParse(request.body)
    if (!result.success) {
      return reply.status(400).send({
        error: 'Invalid input',
        details: result.error.format()
      })
    }
    const { name, email, password } = result.data
    try {
      // 2. Check if user with this email already exists
      const existingUser = await fastify.prisma.user.findUnique({
        where: { email }
      })
      if (existingUser) {
        return reply.status(409).send({ error: 'User with this email already exists' })
      }
      // 3. Hashing password
      const hashedPassword = await bcrypt.hash(password, 10)
      // 4. Creating user in database
      const user = await fastify.prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword
        }
      })
      // 5. Generating token
      const token = fastify.jwt.sign({
        id: user.id,
        email: user.email,
        name: user.name
      })
      return reply.status(201).send({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      })
    } catch (error) {
      fastify.log.error(error)
      return reply.status(500).send({ error: 'Internal server error' })
    }
  })
}

export default authRoutes
