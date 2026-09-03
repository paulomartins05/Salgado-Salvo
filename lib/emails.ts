import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function notificarParceiroNovoResgate(
  emailParceiro: string, 
  nomeCliente: string, 
  nomeLanche: string,
  codigoResgate: string
) {
  try {
    await resend.emails.send({
      from: "Salgado Salvo <naoresponda@resend.dev>",
      to: emailParceiro,
      subject: "🎉 Novo Resgate Confirmado!",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #3A4729;">Você tem um novo pedido!</h2>
          <p>O cliente <strong>${nomeCliente}</strong> acabou de resgatar: <strong>${nomeLanche}</strong>.</p>
          <p>O código de retirada deste pedido é: <strong style="font-size: 20px; color: #D9774A;">${codigoResgate}</strong></p>
          <p>Prepare o pedido, ele passará para retirar em breve.</p>
        </div>
      `
    });
    console.log(`Notificação enviada para o parceiro: ${emailParceiro}`);
  } catch (error) {
    console.error("Erro ao notificar parceiro:", error);
  }
}

export async function notificarConsumidorExpirando(
  emailConsumidor: string, 
  nomeLanche: string,
  nomeParceiro: string
) {
  try {
    await resend.emails.send({
      from: "Salgado Salvo <naoresponda@resend.dev>",
      to: emailConsumidor,
      subject: "⏰ Seu resgate está quase expirando!",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #D9774A;">Não perca sua comida!</h2>
          <p>Seu resgate de <strong>${nomeLanche}</strong> na loja <strong>${nomeParceiro}</strong> está prestes a vencer.</p>
          <p>Vá até o local para fazer a retirada antes que o tempo acabe.</p>
        </div>
      `
    });
    console.log(`Lembrete enviado para o consumidor: ${emailConsumidor}`);
  } catch (error) {
    console.error("Erro ao enviar lembrete para consumidor:", error);
  }
}
