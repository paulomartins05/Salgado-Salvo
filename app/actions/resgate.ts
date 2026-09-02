"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function criarResgate(userId: string, ofertaId: string, quantidadePedida: number = 1) {

  if (quantidadePedida <= 0) {
    throw new Error("A quantidade pedioda deve ser de pelo menos 1 item")
  }

  let redirecionarEsgotado = false

  try {
    const codigoPinGerado = Math.floor(1000 + Math.random() * 9000).toString()

    const novoResgate = await prisma.$transaction(async (tx) => {

      const ofertaAtual = await prisma.oferta.findUnique({
        where: {
          id: ofertaId
        },
        select: {
          quantidade: true
        }
      })

      if (!ofertaAtual) {
        throw new Error("A oferta não existe mais")
      }

      if (ofertaAtual.quantidade < quantidadePedida) {
        throw new Error("Estoque insuficiente")
      }


      const ofertaAtualizada = await tx.oferta.update({
        where: {
          id: ofertaId,
          quantidade: { gte: quantidadePedida }
        },
        data: {
          quantidade: { decrement: quantidadePedida }
        }
      }).catch(() => null)


      if (!ofertaAtualizada) {
        throw new Error("OFERTA_ESGOTADA")
      }

      const resgateGerado = await tx.resgate.create({
        data: {
          userId: userId,
          ofertaId: ofertaId,
          codigoPin: codigoPinGerado,
          quantidade: quantidadePedida,
          status: "PENDENTE"
        }
      })

      return resgateGerado
    })
    revalidatePath("/perfil")
    return novoResgate
  }
  catch (error: any) {
    if (error.message === "OFERTA_ESGOTADA") {
      redirecionarEsgotado = true;
    } else {
      throw error;
    }
  }
  if (redirecionarEsgotado) {
    redirect("/resgates?erro=esgotado");
  }
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


  if (resgate.tentativasPin >= 3) {
    throw new Error("PIN bloqueado após 3 tentativas incorretas. Contate o suporte.")
  }

  if (resgate.codigoPin !== pinDigitado) {
    await prisma.resgate.update({
      where: {
        id: resgateId
      },
      data: {
        tentativasPin: { increment: 1 }
      }
    })
  }


  const tentativasRestantes = 2 - resgate.tentativasPin

  if (tentativasRestantes > 0) {
    throw new Error(`PIN Incorreto. Você tem mais ${tentativasRestantes} tentativa(s)`)
  } else {
    throw new Error("Pin incorreto. Resgate bloqueado por excesso de tentativas")
  }

  await prisma.resgate.update({
    where: { id: resgateId },
    data: {
      status: "RETIRADO",
      tentativasPin: 0
    }
  })

  revalidatePath("/parceiro/perfil")
  return {
    success: true
  }
}

