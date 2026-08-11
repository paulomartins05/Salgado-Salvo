import Container from "../componentes/container";
import Text from "../componentes/text"; 
import Link from "next/link";
import CardProduto, { ProdutoProps } from "../componentes/CardProduto";

const produtosFalsos: ProdutoProps[] = [ // bando de dados falso
  {
    id: 1,
    nome: "Coxinha de Frango Catupiry Especial",
    descricao: "Coxinha de Frango Catupiry Especial feita hoje cedo.",
    preco: 5.90,
    tempoPostagem: "15 min",
    imagemUrl: "https://cdn-icons-png.flaticon.com/512/3225/3225091.png", 
  },
  {
    id: 2,
    nome: "Pão de Queijo Quentinho da Tarde",
    descricao: "Pão de queijo tradicional de minas.",
    preco: 4.50,
    tempoPostagem: "30 min",
    imagemUrl: "https://cdn-icons-png.flaticon.com/512/3225/3225102.png", 
  },
  {
    id: 3,
    nome: "Croissant de Presunto e Queijo Folhado",
    descricao: "Massa folhada derretendo.",
    preco: 7.20,
    tempoPostagem: "5 min",
    imagemUrl: "https://cdn-icons-png.flaticon.com/512/3014/3014529.png", 
  },
  {
    id: 4,
    nome: "Misto Quente Clássico e Suculento",
    descricao: "Feito na chapa com pão de forma.",
    preco: 6.00,
    tempoPostagem: "10 min",
    imagemUrl: "https://cdn-icons-png.flaticon.com/512/2819/2819183.png", 
  }
];

export default function ResgatesDisponiveis() {
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {produtosFalsos.map((produto) => (
            <CardProduto 
              key={produto.id}
              id={produto.id}
              nome={produto.nome}
              descricao={produto.descricao}
              preco={produto.preco}
              tempoPostagem={produto.tempoPostagem}
              imagemUrl={produto.imagemUrl}
            />
          ))}
        </div>
        
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