
import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Header from "@/app/pages/header";
import Container from "@/app/componentes/container";
import Button from "@/app/componentes/button";
import {prisma} from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"; 

async function validarPin(formData: FormData) {
  "use server"
  const resgateId  = formData.get("resgateId") as string
  const pinDigitado = formData.get("pin") as string

  const resgate = await prisma.resgate.findUnique({
    where: {
      id: resgateId
    }
  })


  if (resgate && resgate.codigoPin == pinDigitado) {
    await prisma.resgate.update({
      where: {
        id: resgateId,
      },
      data: {
        status: "RETIRADO"
      }
    })
    revalidatePath("/parceiro/perfil")
  } else {
    console.error("CODIGIN Incorreto")
  }
}

export default async function Parceiro({
  searchParams
}: {
  searchParams: Promise<{aba?: string}>
}) {
  const params = await searchParams
  const abaAtiva = params.aba || "visao-geral"

  const reqHeaders = await headers()
  const session = await auth.api.getSession({
    headers: reqHeaders
  })

  if(!session?.user || session.user.role != "PARCEIRO") {
    redirect("/")
  }

  const usuario = session.user
  const ofertasDoBanco = await prisma.oferta.findMany({
    where: {
      vendedorId: usuario.id
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  const pedidosPendentes = await prisma.resgate.findMany({
    where: {
      oferta: {
        vendedorId: usuario.id
      },
      status: "PENDENTE"
    },

    include: {
      user: true,
      oferta: true
    },
    orderBy: { createdAt: "asc"}
  })

  const resgatesConcluidos = await prisma.resgate.findMany({
    where: {
      oferta: {
        vendedorId: usuario.id
      },
      status: "RETIRADO"
    },
    include: {
      oferta: true
    }
  })

  const saldo = resgatesConcluidos.reduce((total, resgate) => total + Number(resgate.oferta.precoResgate), 0)

  const hoje = new Date().toLocaleDateString("pt-BR")
  const resgatesHoje = resgatesConcluidos.filter(r => r.updatedAt.toLocaleDateString("pt-BR") === hoje).length
  const impactoKg = (resgatesConcluidos.length * 0.3).toFixed(1) 
  return (
    <div className="bg-[#F6EFE5] min-h-screen flex flex-col font-inter text-background-secondary">
      <Header />
      <hr className="opacity-10 border-background-secondary" />

      <main className="py-8 grow">
        <Container>
          
          <div className="mb-8">
            <div className="text-sm text-[#B87042] mb-4 flex items-center gap-2">
              <Link href="/" className="hover:underline">Início</Link>
              <span>{'>'}</span>
              <span className="font-medium">Área do Parceiro</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-playfair font-bold">
              Painel do Parceiro: {usuario.name || "Minha Loja"}
            </h1>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            
            <aside className="w-full md:w-64 shrink-0 flex flex-col gap-2">
              <Link href="?aba=visao-geral" className={`block px-4 py-3 rounded-xl font-medium transition-colors ${abaAtiva === "visao-geral" ? "bg-[#e8d5c4] text-background-secondary" : "hover:bg-[#fdf3ef]"}`}>Visão Geral</Link>
              <Link href="?aba=produtos" className={`block px-4 py-3 rounded-xl font-medium transition-colors ${abaAtiva === "produtos" ? "bg-[#e8d5c4] text-background-secondary" : "hover:bg-[#fdf3ef]"}`}>Meus Produtos</Link>
              <Link href="?aba=financeiro" className={`block px-4 py-3 rounded-xl font-medium transition-colors ${abaAtiva === "financeiro" ? "bg-[#e8d5c4] text-background-secondary" : "hover:bg-[#fdf3ef]"}`}>Relatórios Financeiros</Link>
            </aside>

            <div className="grow flex flex-col gap-6">
              
              {abaAtiva === "visao-geral" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                      <p className="text-sm font-medium opacity-80 mb-2">Saldo a Receber</p>
                      <p className="text-3xl font-bold text-[#6B705C]">R$ {saldo.toFixed(2).replace('.', ',')}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                      <p className="text-sm font-medium opacity-80 mb-2">Resgates Hoje</p>
                      <p className="text-3xl font-bold text-laranja-destaque">{resgatesHoje}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                      <p className="text-sm font-medium opacity-80 mb-2 flex items-center justify-between">
                        Alimento Salvo (Kg) <span className="text-[#6B705C]">🌱</span>
                      </p>
                      <p className="text-3xl font-bold text-[#6B705C]">{impactoKg} kg</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                    
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                      <h2 className="text-xl font-bold mb-1">Validar Resgates Pendentes</h2>
                      <p className="text-sm opacity-70 mb-6">Clientes aguardando retirada hoje.</p>
                      
                      <div className="flex flex-col gap-4">
                        {pedidosPendentes.length === 0 ? (
                          <p className="text-sm text-center opacity-70 py-4">Nenhum cliente na fila.</p>
                        ) : (
                          pedidosPendentes.map(pedido => (
                            <div key={pedido.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                              <div>
                                <p className="font-bold text-sm">{pedido.user.name}</p>
                                <p className="text-xs opacity-80">
                                  {pedido.oferta.titulo} • {pedido.createdAt.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                </p>
                              </div>
                              
                              <form action={validarPin} className="flex items-center gap-2">
                                <input type="hidden" name="resgateId" value={pedido.id} />
                                <input 
                                  type="text" 
                                  name="pin"
                                  placeholder="PIN" 
                                  maxLength={4}
                                  required
                                  className="w-16 px-2 py-1.5 text-center border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-laranja-destaque"
                                />
                                <Button type="submit" className="bg-[#D9774A] hover:bg-[#c4683e] text-white py-1.5 px-3 text-xs h-auto">
                                  VALIDAR
                                </Button>
                              </form>

                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                      <div className="flex items-center justify-between mb-1">
                        <h2 className="text-xl font-bold">Ofertas Ativas</h2>
                        <Link href="/parceiro/novo-resgate">
                          <Button className="bg-[#D9774A] hover:bg-[#c4683e] text-white py-1 px-3 text-xs h-auto">
                            + Novo
                          </Button>
                        </Link>
                      </div>
                      <p className="text-sm opacity-70 mb-6">Controle em tempo real de estoque.</p>
                      
                      <div className="flex flex-col gap-4 max-h-75 overflow-y-auto pr-2">
                        {ofertasDoBanco.length === 0 ? (
                          <p className="text-sm text-center opacity-70 py-4">Nenhuma oferta ativa no momento.</p>
                        ) : (
                          ofertasDoBanco.map(oferta => (
                            <div key={oferta.id} className="flex items-center justify-between p-3 border-b border-gray-100 last:border-0">
                              <div>
                                <p className="font-bold text-sm">{oferta.titulo}</p>
                                <p className="text-xs text-[#6B705C] font-semibold">
                                  R$ {Number(oferta.precoResgate).toFixed(2).replace('.', ',')}
                                </p>
                              </div>
                              <Button variant="outline" className="border-laranja-destaque text-laranja-destaque hover:bg-laranja-destaque hover:text-white py-1 px-3 text-xs h-auto">
                                INATIVAR
                              </Button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                  </div>
                </>
              )}

              {abaAtiva !== "visao-geral" && (
                <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col items-center justify-center h-full">
                  <span className="text-4xl mb-4">🚧</span>
                  <h2 className="text-xl font-bold mb-2">Página em Construção</h2>
                  <p className="opacity-70 text-sm">A tela de "{abaAtiva}" será implementada em breve.</p>
                </div>
              )}

            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}