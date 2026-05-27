import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

// No Prisma 7, passamos o objeto de configuração direto para o adaptador
const adapter = new PrismaLibSql({
  url: 'file:./dev.db',
});

// Instancia o Prisma usando o adaptador configurado
export const prisma = new PrismaClient({ adapter });