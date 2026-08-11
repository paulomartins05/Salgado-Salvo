"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation"; 
import Container from "../componentes/container";
import Header from "../pages/header"; 
import Text from "../componentes/text";
import CardProduto from "../componentes/CardProduto";
import FiltroCategorias from "../componentes/FiltroCategorias";
import Paginacao from "../componentes/Paginacao";

const todosOsProdutos = [
  { id: 1, nome: "Coxinha", categoria: "Salgados", descricao: "Massa suave.", preco: 3.00, tempoPostagem: "15 min", imagemUrl: "https://cdn-icons-png.flaticon.com/512/3225/3225091.png" },
  { id: 2, nome: "Pão de Queijo", categoria: "Assados", descricao: "Pão de Queijo tradicional.", preco: 2.50, tempoPostagem: "15 min", imagemUrl: "https://cdn-icons-png.flaticon.com/512/3225/3225102.png" },
  { id: 3, nome: "Croissant", categoria: "Assados", descricao: "Croissant francês.", preco: 3.00, tempoPostagem: "15 min", imagemUrl: "https://cdn-icons-png.flaticon.com/512/3014/3014529.png" },
  { id: 4, nome: "Bolo de Cenoura", categoria: "Bolos", descricao: "Com cobertura.", preco: 3.00, tempoPostagem: "15 min", imagemUrl: "https://cdn-icons-png.flaticon.com/512/3014/3014529.png" },
  { id: 5, nome: "Brigadeiro", categoria: "Doces", descricao: "Tradicional.", preco: 2.50, tempoPostagem: "2 min", imagemUrl: "https://cdn-icons-png.flaticon.com/512/3014/3014529.png" },
  { id: 6, nome: "Empada de Palmito", categoria: "Salgados", descricao: "Massa podre deliciosa.", preco: 4.00, tempoPostagem: "10 min", imagemUrl: "https://cdn-icons-png.flaticon.com/512/3225/3225091.png" },
  { id: 7, nome: "Suco Natural", categoria: "Outros", descricao: "Laranja geladinho.", preco: 5.00, tempoPostagem: "5 min", imagemUrl: "https://cdn-icons-png.flaticon.com/512/3225/3225102.png" },
  { id: 8, nome: "Torta de Morango", categoria: "Doces", descricao: "Com creme.", preco: 6.50, tempoPostagem: "20 min", imagemUrl: "https://cdn-icons-png.flaticon.com/512/3014/3014529.png" },
  { id: 9, nome: "Esfiha de Carne", categoria: "Assados", descricao: "Temperada com limão.", preco: 2.00, tempoPostagem: "12 min", imagemUrl: "https://cdn-icons-png.flaticon.com/512/2819/2819183.png" },
  { id: 10, nome: "Misto Quente", categoria: "Salgados", descricao: "Feito na chapa.", preco: 3.00, tempoPostagem: "15 min", imagemUrl: "https://cdn-icons-png.flaticon.com/512/2819/2819183.png" }
];

function ConteudoResgates() {
  const searchParams = useSearchParams();
  
  const categoriaDaURL = searchParams.get("categoria") || "Todos";
  
  const [categoriaAtiva, setCategoriaAtiva] = useState(categoriaDaURL);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 10;

  const produtosFiltrados = categoriaAtiva === "Todos" 
    ? todosOsProdutos 
    : todosOsProdutos.filter(produto => produto.categoria === categoriaAtiva);
  
  const totalPaginas = Math.ceil(produtosFiltrados.length / itensPorPagina);
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const indiceFinal = indiceInicial + itensPorPagina;
  
  const produtosDaPagina = produtosFiltrados.slice(indiceInicial, indiceFinal);

  const mudarCategoria = (novaCategoria: string) => {
    setCategoriaAtiva(novaCategoria);
    setPaginaAtual(1);
  };

  return (
    <>
      <FiltroCategorias 
        categoriaAtiva={categoriaAtiva} 
        onMudarCategoria={mudarCategoria} 
      />

      {produtosFiltrados.length === 0 ? (
        <div className="py-12 text-center text-background-secondary font-inter">
          Nenhum resgate disponível na categoria "{categoriaAtiva}" no momento.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {produtosDaPagina.map((produto) => (
            <CardProduto key={produto.id} {...produto} />
          ))}
        </div>
      )}

      <Paginacao paginaAtual={paginaAtual} totalPaginas={totalPaginas} onMudarPagina={setPaginaAtual} />
    </>
  );
}

export default function PaginaTodosResgates() {
  return (
    <div className="bg-[#F6EFE5] min-h-screen flex flex-col">
      <Header />
      <hr className="opacity-10 border-background-secondary" />

      <main className="py-8 flex-grow">
        <Container>
          <div className="text-sm font-inter text-[#B87042] mb-6 flex items-center gap-2">
            <span className="hover:underline cursor-pointer">Início</span>
            <span>{'>'}</span>
            <span className="text-background-secondary font-medium">Todos os Resgates</span>
          </div>

          <div className="mb-8">
            <Text variant="playfair" as="h1" className="text-4xl md:text-5xl text-background-secondary font-bold mb-3">
              Todos os Resgates Disponíveis
            </Text>
            <p className="font-inter text-background-secondary opacity-90 text-sm md:text-base max-w-3xl">
              Lanches fresquinhos prontos para serem salvos.
            </p>
          </div>

          <Suspense fallback={<div>Carregando resgates...</div>}>
            <ConteudoResgates />
          </Suspense>

        </Container>
      </main>
    </div>
  );
}