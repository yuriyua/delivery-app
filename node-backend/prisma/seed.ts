import 'dotenv/config'
import { setDefaultResultOrder } from 'node:dns'
setDefaultResultOrder('ipv4first')
import { PrismaClient } from '../src/generated/prisma/index.js'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import bcrypt from 'bcrypt'

const adapter = new PrismaMariaDb({
    host: process.env.DB_HOST || 'db',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'delivery_db'
})

const prisma = new PrismaClient({
    adapter,
    log: ['query', 'info', 'warn', 'error']
})

async function main() {
    console.log('🌱 Start seeding...')

    const admin = await prisma.user.upsert({
        where: { email: process.env.ADMIN_EMAIL },
        update: {},
        create: {
            email: process.env.ADMIN_EMAIL!,
            name: process.env.ADMIN_NAME!,
            phone: process.env.ADMIN_PHONE!,
            password: await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10),
        },
    })

    console.log({ admin })
    console.log('✅ Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
