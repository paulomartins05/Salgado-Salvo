"use client"

import Link from "next/link"
import Header from "../pages/header"
import Container from "../componentes/container"
import Text from "../componentes/text"
import Button from "../componentes/button"
import InputForm from "../componentes/InputForm"
import { authClient } from "@/lib/auth-client"

// Dados falsos
const historicoReceneteFalso = [
  {
    id: 1,
    nome: "Coxinha",
    data: "12/08",
    loja: "Padaria Delicia",
    status: "Retirado",
  }, {
    id: 2,
    nome: "Croissant Frances",
    data: "10/08",
    loja: "Padaria Francesa",
    status: "Retirado",
  }
]

export default function PerfilPage() {
  const {data: session} = authClient.useSession()

  const usuario = session?.user

  if(!usuario) {
    return (
      <div className="bg-[#F6EFE5] min-h-screen flex flex-col font-inter">
        <Header />
        <main className="py-10 grow">
          <Container>
            <div className="text-center py-20 text-background-secondary/70">
              Carregando Dados do perfil
            </div>
          </Container>
        </main>
      </div>
    )
  }

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
                <span className="font-bold text-5xl mb-1 text-laranja-destaque">12</span>
                <span className="text-xs uppercase font-medium tracking-wider opacity-70">RESGATES</span>
              </div>
              
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
                <span className="font-bold text-5xl mb-1 text-background-secondary">
                  <span className="text-2xl font-semibold">R$</span> 68
                </span>
                <span className="text-xs uppercase font-medium tracking-wider opacity-70">ECONOMIZADO</span>
              </div>

            </div>

            <div>
              <h2 className="text-xl font-bold text-laranja-destaque mb-5">HISTÓRICO RECENTE</h2>
              <div className="flex flex-col gap-4">
                {historicoReceneteFalso.map((item) => (
                  <div key={item.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                    
                    <div className="w-14 h-14 bg-[#F1E9DE] rounded-xl flex items-center justify-center shrink-0 text-3xl">
                      📦
                    </div>
                    
                    <div className="grow">
                      <h3 className="font-bold text-sm md:text-base mb-0.5">{item.nome}</h3>
                      <p className="text-xs opacity-70">
                        Retirado em {item.data} • {item.loja}
                      </p>
                    </div>
                    
                    <div className="text-xs font-bold text-laranja-destaque px-3 py-1 bg-laranja-destaque/10 rounded-full border border-laranja-destaque/20">
                      {item.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-gray-200 mt-4 relative">
              <h2 className="text-lg font-bold text-laranja-destaque mb-6">EDITAR PERFIL</h2>
              
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                <InputForm 
                  label="Nome"
                  name="nome"
                  type="text"
                  defaultValue={usuario.name}
                  className="bg-white"
                />
                
                <InputForm 
                  label="E-mail"
                  name="email"
                  type="email"
                  defaultValue={usuario.email}
                  className="bg-white text-gray-500 cursor-not-allowed"
                  disabled
                />

                <div className="md:col-span-2 flex justify-end mt-4">
                  <Button type="submit" className="bg-[#D9774A] hover:bg-[#c4683e] text-white">
                    SALVAR ALTERAÇÕES
                  </Button>
                </div>
              </form>
            </div>

          </div>
        </Container>
      </main>
    </div>
  );
}