import { PrismaClient } from '@prisma/client'

// Cria a função que inicializa o Prisma
const prismaClientSingleton = () => {
  return new PrismaClient()
}

// Garante que o TypeScript entenda a variável global
declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

// Se já existir uma conexão aberta, usa ela. Se não, cria uma nova.
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

// No ambiente de desenvolvimento, salva a conexão na variável global para sobreviver ao recarregamento do Next.js
if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma