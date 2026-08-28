"use server"

import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadImagemPerfil(formData: FormData) {
  
  const imagem = formData.get("imagem") as File | null

  if (!imagem) {
    return null
  }

  const bytes = await imagem.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const url = await new Promise<string>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream( {
      folder: "salgado_salvo_avatares",
      format: "webp",
      quality: "auto",

      transformation: [
        { width: 400, height: 400, crop: "fill", gravity: "face"}
      ]
    }, (
      error, result
    ) => {
      if (error) {
        reject(error)
      } else {
        resolve(result?.secure_url || "")
      }
    }
  )
  uploadStream.end(buffer)
  })

  return url

}

export async function uploadImagemProduto(imagem: File | null): Promise<string | null> {
  if (!imagem || imagem.size === 0) {
    return null;
  }

  const bytes = await imagem.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise<string>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "salgado_salvo",
        format: "webp",
        quality: "auto",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result?.secure_url || "");
        }
      }
    );
    uploadStream.end(buffer);
  });
}