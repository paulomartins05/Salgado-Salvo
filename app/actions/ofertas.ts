"use server";

import {z} from "zod"
import {prisma} from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary} from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const ofertaSchema = z.object({
  titulo: z.string().min(3, "Precisa de 3 caracteres"),
  descricao: z.string().min(5, "Adicione uma descrição mais detalhada"),
  categoria: z.string().min(1, "Categoria é obrigatorio"),
  localizacao: z.string().min(1, "A localização é obrigatório"),
  precoOriginal: z.number().positive("O preço original deve ser maior que zero"),
  precoResgate: z.number().positive("O preço de resgate deve ser maior que zero"),
  quantidade: z.number().int().positive("A quantidade deve ser de pelo menos 1 item"),
  dataValidade: z.date().min(new Date(), "A data de validade deve ser no futuro"),
}).refine((dados) => dados.precoResgate < dados.precoOriginal, {
  message: "O preço de resgate deve ser obrigatoriamente menor que o preço original",
  path: ["precoResgate"]
})


export async function criarOferta(formData: FormData) {

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if(!session || session.user.role !== "PARCEIRO") {
    return   {
      success: false, 
      erroGeral: "Acesso negado. Apenas parceiros podem criar ofertas." 
    };
  }

  const dadosBrutos = {
    titulo: formData.get("titulo") as string,
    descricao: formData.get("descricao") as string,
    categoria: formData.get("categoria") as string,
    localizacao: formData.get("localizacao") as string,
    precoOriginal: parseFloat(formData.get("precoOriginal") as string),
    precoResgate: parseFloat(formData.get("precoResgate") as string),
    quantidade: parseInt(formData.get("quantidade") as string),
    dataValidade: new Date(formData.get("dataValidade") as string),
  }


  const validacao = ofertaSchema.safeParse(dadosBrutos)

  if(!validacao.success) {
    return {
      success: false,
      erros: validacao.error.flatten().fieldErrors
    }
  }

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
        titulo: validacao.data.titulo,
        descricao: validacao.data.descricao,
        categoria: validacao.data.categoria,
        localizacao: validacao.data.localizacao,
        precoOriginal: validacao.data.precoOriginal,
        precoResgate: validacao.data.precoResgate,
        quantidade: validacao.data.quantidade,
        dataValidade: validacao.data.dataValidade,
        imagemUrl: urlImagemSalva,
        vendedorId: session.user.id,
      }
    })

    revalidatePath("/")

    return {success: true, oferta: novaOferta}
    
  } catch (error) {
    console.error("Erro no Prisma:", error); 
    return { success: false, erroGeral: "Erro interno ao salvar a oferta no banco de dados." };
  }
}