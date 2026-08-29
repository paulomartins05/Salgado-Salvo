"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadImagemProduto } from "./upload";

export async function atualizarPerfilUsuario(formData: FormData) {
    const reqHeaders = await headers()
    const session = await auth.api.getSession({
        headers: reqHeaders
    })

    if (!session) {
        throw new Error("Você precisa estar logado para realizar essa ação")
    }

    const nome = formData.get("nome") as string;
    const email = formData.get("email") as string;
    const telefone = formData.get("telefone") as string;
    const imagem = formData.get("imagem") as File | null;


    let novaImagemUrl = undefined
    if (imagem && imagem.size > 0) {
        const url = await uploadImagemProduto(imagem)

        if (url) {
            novaImagemUrl = url
        }
    }

    await auth.api.updateUser({
        headers: reqHeaders,

        body: {
            name: nome,
            ...(novaImagemUrl && { image: novaImagemUrl })
        }
    })

    await prisma.user.update({
        where: {
            id: session.user.id
        },
        data: {
            email: email,
            telefone: telefone,
        }
    })

    revalidatePath("/perfil")
    redirect("/perfil")
}