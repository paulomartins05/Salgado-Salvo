"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function criarResgate(userId: string, ofertaId: string) {

  const codigoPinGerado = Math.floor(1000 + Math.random() * 9000).toString()

  const novoResgate = await prisma.$transaction(async (tx) => {
    const ofertaAtualizada = await tx.oferta.update({
      where: {
        id: ofertaId,
        quantidade: { gt: 0 }
      },
      data: {
        quantidade: { decrement: 1 }
      }
    }).catch(() => null)


    if (!ofertaAtualizada) {
      redirect("/resgates?erro=esgotado")
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

  const reqHeaders = await headers()
  const session = await auth.api.getSession({
    headers: reqHeaders
  })

  if (!session || session.user.role !== "PARCEIRO") {
    throw new Error("Acesso negado. apenas parceiros podem validar resgates")
  }

  const resgate = await prisma.resgate.findUnique({
    where: {
      id: resgateId
    },
    include: {
      oferta: true
    }
  })

  if (!resgate) {
    throw new Error("Resgate não Encontrado")
  }

  if (resgate.oferta.vendedorId !== session.user.id) {
    throw new Error("Você não pode validar esse resgate")
  }

  if (resgate.codigoPin !== pinDigitado) {
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

