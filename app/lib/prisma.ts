import { PrismaClient } from '@prisma/client';

declare global {
  // Чтобы избежать повторной инициализации в режиме разработки
  // (Hot Reloading)
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;
