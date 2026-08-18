"use server";

import {prisma} from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary} from "cloudinary"
import { rejects } from "assert";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})


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
  const categoria = formData.get("categoria") as string
  const localizacao = formData.get("localizacao") as string
  const precoOriginal = parseFloat(formData.get("precoOriginal") as string)
  const precoResgate = parseFloat(formData.get("precoResgate") as string) 
  const quantidade = parseInt(formData.get("quantidade") as string)
  const dataValidade = new Date(formData.get("dataValidade") as string)

  const imagem = formData.get("imagem") as File | null
  let urlImagemSalva = null

  if (imagem) {
    const bytes = await imagem.arrayBuffer()
    const buffer = Buffer.from(bytes)

    urlImagemSalva = await new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream({
        folder: "salgado_salvo",
        format: "webp",
        quality: "auto"
      }, (error, result) => {
        if (error) {reject(error)}
        else {resolve(result?.secure_url || "")}
      }
    )
    uploadStream.end(buffer)
    })
  }

  try {
    const novaOferta = await prisma.oferta.create({
      data: {
        titulo,
        descricao,
        categoria,
        localizacao,
        precoOriginal,
        precoResgate,
        quantidade,
        dataValidade,
        imagemUrl: urlImagemSalva,
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