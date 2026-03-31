import 'dotenv/config'
import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client' // Usually better to use the default path unless you have a specific reason not to
import ws from 'ws'

// Required for Neon connection strings in some environments (like Node.js local dev)
neonConfig.webSocketConstructor = ws
const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })
const adapter = new PrismaNeon(pool)

// Prevent multiple instances of Prisma Client in development (Hot Reloading)
const globalForPrisma = global;

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma