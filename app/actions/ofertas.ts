"use server";

import {prisma} from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";


export async function criarOferta(formData: FormData) {

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if(!session) {
    throw new Error("NAO ESTA LOGADO")
  }

  if(session.user.role !== "PARCEIRO") {
    throw new Error ("Apenas PARCEIROS")
  }

  const titulo = formData.get("titulo") as string
  const descricao = formData.get("descricao") as string
  const precoOriginal = parseFloat(formData.get("precoOriginal") as string)
  const precoDesconto = parseFloat(formData.get("precoDesconto") as string) 
  const quantidade = parseInt(formData.get("quantidade") as string)
  const dataValidade = new Date(formData.get("dataValidade") as string)

  try {
    const novaOferta = await prisma.oferta.create({
      data: {
        titulo,
        descricao,
        precoOriginal,
        precoDesconto,
        quantidade,
        dataValidade,

        vendedorId: session.user.id,
      }
    })

    revalidatePath("/")

    return {success: true, oferta: novaOferta}
    
  } catch (error) {
    console.log(error) 
    throw new Error ("Erro ao postar a oferta")
  }
}