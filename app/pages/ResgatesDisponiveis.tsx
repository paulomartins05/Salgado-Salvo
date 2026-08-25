import Container from "../componentes/container";
import Text from "../componentes/text"; 
import Link from "next/link";
import CardProduto, { ProdutoProps } from "../componentes/CardProduto";
import { prisma } from "@/lib/prisma"

function calcularTempoPostagem(dataCriacao: Date): string {
  const agora = new Date()
  const diferencaEmMilissegundos = agora.getTime() - dataCriacao.getTime();
  const diferencaEmMinitos = Math.floor(diferencaEmMilissegundos / (1000 * 60))
  const diferencaEmHoras = Math.floor(diferencaEmMinitos / 60)

  if (diferencaEmMinitos < 60) {
    return `${diferencaEmMinitos} min`
  }

  if (diferencaEmHoras < 24) {
    return `${diferencaEmHoras} h`
  }

  return `${Math.floor(diferencaEmHoras / 24)} d`;
}




export default async function ResgatesDisponiveis() {

  const ofertas = await prisma.oferta.findMany({
    take: 4,
    orderBy: {
      createdAt: "desc"
    },
    where: {
      dataValidade: {
        gt: new Date()
      },

      quantidade: {
        gt: 0
      }
    }
  })

  return (
    <section className="py-12 bg-background-primary w-full">
      <Container>
        
        <div className="flex items-end justify-between mb-8">
          <Text variant="playfair" as="h2" className="text-3xl md:text-4xl text-background-secondary font-bold">
            Resgates <span className="text-laranja-destaque">Disponíveis</span> Agora
          </Text>
          
          <Link 
            href="/resgates" 
            className="text-sm font-bold text-background-secondary uppercase border-b-2 border-background-secondary pb-0.5 transition-colors hover:text-laranja-destaque hover:border-laranja-destaque shrink-0 hidden md:block"
          >
            Ver todos os resgates
          </Link>
        </div>

        {ofertas.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">Nenhum resgate disponível no momento. Volte mais tarde!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ofertas.map((oferta) => (
              <CardProduto 
                key={oferta.id}
                id={oferta.id}
                nome={oferta.titulo}
                descricao={oferta.descricao}
                preco={oferta.precoResgate}
                tempoPostagem={calcularTempoPostagem(oferta.createdAt)}
                imagemUrl={oferta.imagemUrl ||"https://cdn-icons-png.flaticon.com/512/3225/3225091.png" }
              />
            ))}
          </div>
        )}
        
        <div className="mt-8 flex justify-center md:hidden">
          <Link 
            href="/resgates" 
            className="text-sm font-bold text-background-secondary uppercase border-b-2 border-background-secondary pb-0.5"
          >
            Ver todos os resgates
          </Link>
        </div>

      </Container>
    </section>
  );
}