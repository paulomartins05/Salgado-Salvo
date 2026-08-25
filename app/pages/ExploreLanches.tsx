import Container from "../componentes/container";
import Text from "../componentes/text"; 
import { cn } from "../../lib/utils";
import Link from "next/link"; 


const categoriasLanches = [
  { id: 1, nome: "Salgados", itens: 25, icone: "🥟" },
  { id: 2, nome: "Doces", itens: 28, icone: "🍩" },
  { id: 3, nome: "Assados", itens: 14, icone: "🥐" },
  { id: 4, nome: "Bolos", itens: 31, icone: "🍰" },
  { id: 5, nome: "Outros", itens: 50, icone: "🛒" },
];

export default function ExploreLanches() {
  return (
    <section className="py-12 bg-background-primary w-full overflow-hidden">
      <Container>
        <div className="mb-8">
          <Text variant="playfair" as="h2" className="text-3xl md:text-4xl text-background-secondary font-bold">
            Explore os <span className="text-laranja-destaque">Lanches</span>
          </Text>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 pb-6 pt-2 w-full">
          
          {categoriasLanches.map((categoria) => (
            <Link 
              href={`/resgates?categoria=${categoria.nome}`} 
              key={categoria.id} 
              className={cn(
                "flex flex-col items-center justify-center w-full h-37.5 rounded-3xl cursor-pointer transition-all duration-300 shadow-sm hover:-translate-y-1 hover:shadow-md hover:bg-[#8C6C3D] hover:text-white bg-background-secondary text-white group"
              )}
            >
              <div className="text-5xl mb-3 drop-shadow-md group-hover:scale-110 transition-transform">
                {categoria.icone}
              </div>
              
              <h3 className="font-inter font-semibold text-sm mb-0.5 text-center">
                {categoria.nome}
              </h3>
              <p className="font-inter text-xs opacity-70">
                Ver opções
              </p>
            </Link>
          ))}
          
        </div>
      </Container>
    </section>
  );
}