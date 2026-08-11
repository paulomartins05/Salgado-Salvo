import Image from "next/image";
import Link from "next/link";
import Header from "../../pages/header"; 
import Container from "../../componentes/container";
import ProdutoDetalhes from "../../componentes/ProdutoDetalhes";

const bancoDeDadosFalso = [ // A espera do Backend
  {
    id: "1",
    nome: "Coxinha de Frango Catupiry Especial",
    loja: "Padaria Delícia do Bairro",
    descricao: "Crocante por fora, cremosa por dentro. Recheio autêntico de frango com Catupiry genuíno, temperado com ervas.",
    precoOriginal: 8.00,
    precoAtual: 3.00,
    tempoPostagem: "15 min",
    imagemPrincipal: "https://cdn-icons-png.flaticon.com/512/3225/3225091.png"
  },
  {
    id: "2",
    nome: "Pão de Queijo",
    loja: "Cantina Dona Maria",
    descricao: "Pão de queijo tradicional de minas, recém-saído do forno.",
    precoOriginal: 5.00,
    precoAtual: 2.50,
    tempoPostagem: "15 min",
    imagemPrincipal: "https://cdn-icons-png.flaticon.com/512/3225/3225102.png"
  },
  {
    id: "3",
    nome: "Croissant",
    loja: "Boulangerie Central",
    descricao: "Croissant francês com massa folhada derretendo.",
    precoOriginal: 6.00,
    precoAtual: 3.00,
    tempoPostagem: "15 min",
    imagemPrincipal: "https://cdn-icons-png.flaticon.com/512/3014/3014529.png"
  },
  {
    id: "4",
    nome: "Misto Quente",
    loja: "Lanchonete da Esquina",
    descricao: "Feito na chapa com pão de forma fresquinho e muito queijo derretido.",
    precoOriginal: 6.00,
    precoAtual: 3.00,
    tempoPostagem: "15 min",
    imagemPrincipal: "https://cdn-icons-png.flaticon.com/512/2819/2819183.png"
  },
  {
    id: "5",
    nome: "Bolo de Cenoura",
    loja: "Doceria Açúcar e Afeto",
    descricao: "Fatia generosa de bolo de cenoura com cobertura de chocolate.",
    precoOriginal: 6.00,
    precoAtual: 3.00,
    tempoPostagem: "15 min",
    imagemPrincipal: "https://cdn-icons-png.flaticon.com/512/3014/3014529.png"
  },
  {
    id: "6",
    nome: "Empada de Palmito",
    loja: "Salgaderia Central",
    descricao: "Massa podre que derrete na boca com recheio cremoso de palmito.",
    precoOriginal: 8.00,
    precoAtual: 4.00,
    tempoPostagem: "10 min",
    imagemPrincipal: "https://cdn-icons-png.flaticon.com/512/3225/3225091.png"
  },
  {
    id: "7",
    nome: "Suco Natural",
    loja: "Casa dos Sucos",
    descricao: "Suco de laranja natural, geladinho, ideal para acompanhar lanches.",
    precoOriginal: 10.00,
    precoAtual: 5.00,
    tempoPostagem: "5 min",
    imagemPrincipal: "https://cdn-icons-png.flaticon.com/512/3225/3225102.png"
  },
  {
    id: "8",
    nome: "Torta de Frango",
    loja: "Padaria Delícia do Bairro",
    descricao: "Pedaço generoso de torta de frango bem temperada.",
    precoOriginal: 13.00,
    precoAtual: 6.50,
    tempoPostagem: "20 min",
    imagemPrincipal: "https://cdn-icons-png.flaticon.com/512/3014/3014529.png"
  },
  {
    id: "9",
    nome: "Esfiha de Carne",
    loja: "Empório Árabe",
    descricao: "Esfiha assada de carne, temperada com limão e especiarias.",
    precoOriginal: 4.00,
    precoAtual: 2.00,
    tempoPostagem: "12 min",
    imagemPrincipal: "https://cdn-icons-png.flaticon.com/512/2819/2819183.png"
  },
  {
    id: "10",
    nome: "Brigadeiro",
    loja: "Doceria Açúcar e Afeto",
    descricao: "Brigadeiro tradicional feito com chocolate nobre e granulado.",
    precoOriginal: 5.00,
    precoAtual: 2.50,
    tempoPostagem: "2 min",
    imagemPrincipal: "https://cdn-icons-png.flaticon.com/512/3014/3014529.png"
  },
  {
    id: "11",
    nome: "Bauru",
    loja: "Lanchonete da Esquina",
    descricao: "Lanche no pão francês com presunto, queijo derretido e tomate.",
    precoOriginal: 9.00,
    precoAtual: 4.50,
    tempoPostagem: "8 min",
    imagemPrincipal: "https://cdn-icons-png.flaticon.com/512/2819/2819183.png"
  },
  {
    id: "12",
    nome: "Quibe",
    loja: "Empório Árabe",
    descricao: "Quibe frito na hora, crocante por fora e macio por dentro.",
    precoOriginal: 7.00,
    precoAtual: 3.50,
    tempoPostagem: "15 min",
    imagemPrincipal: "https://cdn-icons-png.flaticon.com/512/3225/3225091.png"
  }
];

const buscarProdutoNoBancoDeDados = (id: string) => {
  const produtoEncontrado = bancoDeDadosFalso.find(produto => produto.id === String(id));
  return produtoEncontrado || bancoDeDadosFalso[0];
}

export default async function PaginaProdutoUnico({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  
  const idResolvido = (await params).id;
  const produto = buscarProdutoNoBancoDeDados(idResolvido);

  return (
    <div className="bg-[#F6EFE5] min-h-screen flex flex-col">
      <Header />
      <hr className="opacity-10 border-background-secondary" />

      <main className="py-8 flex-grow">
        <Container>
          
          <div className="text-sm font-inter text-[#B87042] mb-6 flex items-center gap-2">
            <Link href="/" className="hover:underline">Início</Link>
            <span>{'>'}</span>
            <Link href="/resgates" className="hover:underline">Resgates</Link>
            <span>{'>'}</span>
            <span className="text-background-secondary font-medium truncate">
              {produto.nome}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            
            <div className="flex flex-col gap-4">
              <div className="bg-[#EBECEE] rounded-[24px] w-full h-[300px] md:h-[500px] relative flex items-center justify-center p-8">
                <Image 
                  src={produto.imagemPrincipal}
                  alt={produto.nome}
                  fill
                  className="object-contain drop-shadow-xl p-8"
                />
              </div>
              
              <div className="flex gap-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="bg-[#EBECEE] border-2 border-transparent hover:border-[#D9774A] rounded-xl w-20 h-20 relative cursor-pointer transition-colors">
                    <Image src={produto.imagemPrincipal} alt="Miniatura" fill className="object-contain p-2" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <ProdutoDetalhes 
                nome={produto.nome}
                loja={produto.loja}
                descricao={produto.descricao}
                precoOriginal={produto.precoOriginal}
                precoAtual={produto.precoAtual}
                tempoPostagem={produto.tempoPostagem}
              />
            </div>
            
          </div>
          
        </Container>
      </main>
    </div>
  );
} 