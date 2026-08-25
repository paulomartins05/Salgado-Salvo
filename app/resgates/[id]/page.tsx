import Image from "next/image";
import Link from "next/link";
import Header from "../../pages/header"; 
import Container from "../../componentes/container";
import ProdutoDetalhes from "../../componentes/ProdutoDetalhes";

import {prisma} from "@/lib/prisma"
import { notFound } from "next/navigation";


export default async function PaginaProdutoUnico({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  
  const idResolvido = (await params).id;
  const produto = await prisma.oferta.findUnique({
    where: {
      id: idResolvido,
    },
    
    include: {
      vendedor: true,
    },


  })

  if(!produto) {
    notFound()
  }

  const imagemOficial = produto.imagemUrl || "https://cdn-icons-png.flaticon.com/512/3225/3225091.png"

  const nomeDaLoja = produto.vendedor.name || "Parceiro Salgado Salvo";


  return (
    <div className="bg-[#F6EFE5] min-h-screen flex flex-col">
      <Header />
      <hr className="opacity-10 border-background-secondary" />

      <main className="py-8 grow">
        <Container>
          
          <div className="text-sm font-inter text-[#B87042] mb-6 flex items-center gap-2">
            <Link href="/" className="hover:underline">Início</Link>
            <span>{'>'}</span>
            <Link href="/resgates" className="hover:underline">Resgates</Link>
            <span>{'>'}</span>
            <span className="text-background-secondary font-medium truncate">
              {produto.titulo} 
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            
            <div className="flex flex-col gap-4">
              <div className="bg-[#EBECEE] rounded-3xl w-full h-75 md:h-125 relative flex items-center justify-center p-8 overflow-hidden">
                <Image 
                  src={imagemOficial}
                  alt={produto.titulo}
                  fill
                  className="object-contain drop-shadow-xl p-8"
                />
              </div>
              
              <div className="flex gap-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="bg-[#EBECEE] border-2 border-transparent hover:border-[#D9774A] rounded-xl w-20 h-20 relative cursor-pointer transition-colors overflow-hidden">
                    <Image src={imagemOficial} alt="Miniatura" fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <ProdutoDetalhes 
                nome={produto.titulo} 
                loja={nomeDaLoja}
                descricao={produto.descricao}
                precoOriginal={Number(produto.precoOriginal)} 
                precoAtual={Number(produto.precoResgate)} 
                tempoPostagem="Retirada Imediata" 
              />
            </div>
            
          </div>
          
        </Container>
      </main>
    </div>
  );
}