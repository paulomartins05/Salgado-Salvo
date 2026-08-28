"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export default async function criarResgate(userId: string, ofertaId: string) {

  const codigoPinGerado = Math.floor(1000 + Math.random() * 9000).toString()

  const novoResgate = await prisma.$transaction(async (tx) => {
    const ofertaAtualizada = await tx.oferta.update({
      where: {
        id: ofertaId,
        quantidade: {gt: 0}
      },
      data: {
        quantidade: { decrement: 1 }
      }
    }).catch(() => null)


    if(!ofertaAtualizada) {
      throw new Error("Oferta esgotada")
    }

    return tx.resgate.create({
      data: {
        userId: userId,
        ofertaId: ofertaId,
        codigoPin: codigoPinGerado,
        status: "PENDENTE"
      }
    })
  })
  revalidatePath("/perfil")
  return novoResgate
}

export async function validarResgate(resgateId: string, pinDigitado: string) {

  const resgate = await prisma.resgate.findUnique({
    where: { id: resgateId }
  })

  if(!resgate) {
    throw new Error("Resgate não Encontrado")
  }

  if(resgate.codigoPin !== pinDigitado) {
    throw new Error("PIN incorreto")
  }


  await prisma.resgate.update({
    where: { id: resgateId },
    data: { status: "RETIRADO" }
  })

  revalidatePath("/parceiro/perfil")
  return {
    success: true
  }
}

