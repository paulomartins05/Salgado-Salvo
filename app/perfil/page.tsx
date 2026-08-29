import Link from "next/link"
import Header from "../pages/header"
import Container from "../componentes/container"
import Text from "../componentes/text"
import Button from "../componentes/button"
import InputForm from "../componentes/InputForm"
import { authClient } from "@/lib/auth-client"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function PerfilPage() {


  const reqHeaders = await headers()
  const session = await auth.api.getSession({
    headers: reqHeaders
  })

  const usuario = session?.user

  if (!usuario) {
    redirect("/login")
  }


  const historicoPedidos = await prisma.resgate.findMany({
    where: { userId: usuario.id },
    include: {
      oferta: {
        include: {
          vendedor: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  const totalResgates = historicoPedidos.length
  const valorEconomizado = historicoPedidos.reduce((total, resgate) => {
    const economia = Number(resgate.oferta.precoOriginal) - Number(resgate.oferta.precoResgate)
    return total + (isNaN(economia) ? 0 : economia)
  }, 0)

  return (
    <div className="bg-[#F6EFE5] min-h-screen flex flex-col font-inter text-background-secondary">
      <Header />
      <hr className="opacity-10 border-background-secondary" />

      <main className="py-8 grow">
        <Container>

          <div className="text-sm text-[#B87042] mb-6 flex items-center gap-2">
            <Link href="/" className="hover:underline">Início</Link>
            <span>{'>'}</span>
            <span className="font-medium">Minha conta</span>
          </div>

          <div className="bg-[#fdf3ef] border border-[#e8dfd5] shadow-sm rounded-3xl p-6 md:p-10 flex flex-col gap-10">

            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-full border-2 border-background-secondary flex items-center justify-center bg-white overflow-hidden shrink-0">
                {usuario.image ? (
                  <img src={usuario.image} alt={usuario.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-bold uppercase text-4xl text-background-secondary">
                    {usuario.name ? usuario.name.charAt(0) : "👤"}
                  </span>
                )}
              </div>

              <div className="text-center md:text-left grow">
                <Text variant="playfair" as="h1" className="text-3xl md:text-4xl font-bold mb-1">
                  {usuario.name || "Usuário Salgado Salvo"}
                </Text>
                <p className="text-sm opacity-80">{usuario.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
                <span className="font-bold text-5xl mb-1 text-laranja-destaque">{totalResgates}</span>
                <span className="text-xs uppercase font-medium tracking-wider opacity-70">RESGATES</span>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
                <span className="font-bold text-5xl mb-1 text-background-secondary">
                  <span className="text-2xl font-semibold">R$</span> {valorEconomizado.toFixed(2).replace('.', ',')}
                </span>
                <span className="text-xs uppercase font-medium tracking-wider opacity-70">ECONOMIZADO</span>
              </div>

            </div>

            <div>
              <h2 className="text-xl font-bold text-laranja-destaque mb-5">HISTÓRICO RECENTE</h2>
              <div className="flex flex-col gap-4">
                {historicoPedidos.length === 0 ? (
                  <p className="text-sm opacity-70">Você ainda não realizou nenhum resgate.</p>
                ) : (
                  historicoPedidos.map((resgate) => (
                    <div key={resgate.id} className="flex justify-between p-3 border-b border-gray-100">
                      <div>
                        <p className="font-bold text-sm">{resgate.oferta.titulo}</p>
                        <p className="text-xs opacity-70">
                          {resgate.oferta.vendedor?.name || "Loja Parceira"}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-semibold text-laranja-destaque">{resgate.status}</p>
                        <p className="text-xs opacity-70">
                          {resgate.createdAt.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-8 border-t border-gray-200 mt-4 relative">
              <h2 className="text-lg font-bold text-laranja-destaque mb-6">EDITAR PERFIL</h2>
              <div className="mt-6">
                <Link href="/perfil/editar">
                  <Button className="bg-gray-100 text-gray-700 hover:bg-gray-200 w-full py-2 rounded-xl font-medium border border-gray-300 shadow-sm">
                    ✏️ Editar Perfil
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        </Container>
      </main>
    </div>
  )
}