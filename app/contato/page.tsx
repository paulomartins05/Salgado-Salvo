import Header from "../pages/header";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Button from "../componentes/button";

export default async function Contato() {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({
    headers: reqHeaders
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="bg-[#F6EFE5] min-h-screen flex flex-col">
      <Header />
      <hr className="opacity-10 border-background-secondary" />

      <main className="py-12 grow flex flex-col items-center justify-center px-6 font-inter">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h1 className="text-2xl font-playfair font-bold text-center mb-2">Fale com a gente</h1>
          <p className="text-sm text-gray-600 text-center mb-6">
            Dúvida, sugestão ou problema com um resgate? Manda pra gente.
          </p>

          <form className="flex flex-col gap-4">
            <div>
              <label htmlFor="assunto" className="block text-sm font-medium mb-1">Assunto</label>
              <input
                id="assunto"
                name="assunto"
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#D9774A]"
                placeholder="Ex: Problema com o resgate"
              />
            </div>

            <div>
              <label htmlFor="mensagem" className="block text-sm font-medium mb-1">Mensagem</label>
              <textarea
                id="mensagem"
                name="mensagem"
                required
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#D9774A] resize-none"
                placeholder="Escreva sua mensagem aqui..."
              ></textarea>
            </div>

            <Button type="button" className="mt-2 bg-[#D9774A] hover:bg-[#c4683e] text-white py-3 rounded-xl w-full font-bold">
              Enviar Mensagem
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}