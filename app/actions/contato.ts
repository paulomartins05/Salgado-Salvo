"use server"

import { resend } from "@/lib/emails"

export async function enviarMensagemContato(formData: FormData) {
    const assunto = formData.get("assunto") as string
    const mensagem = formData.get("mensagem") as string

    await resend.emails.send({
        from: "Salgado Salvo <naoresponda@resend.dev>",
        to: "suporte@seudominio.com",
        subject: `Contato: ${assunto}`,
        html: `<p>${mensagem}</p>`
    })

    return { success: true }
}