import { PrismaClient } from '@prisma/client';

if (!process.env.DATABASE_URL) {
  console.error("Missing DATABASE_URL environment variable");
}

const globalForPrisma = global;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query', 'error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Do NOT export default prisma
