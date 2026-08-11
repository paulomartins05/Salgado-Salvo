interface PaginacaoProps {
  paginaAtual: number;
  totalPaginas: number;
  onMudarPagina: (pagina: number) => void;
}

export default function Paginacao({ paginaAtual, totalPaginas, onMudarPagina }: PaginacaoProps) {
  if (totalPaginas <= 1) {
    return null;
  }

  const paginas = Array.from({ length: totalPaginas }, (_, index) => index + 1);

  return (
    <div className="w-full flex flex-col items-center justify-center mt-12 mb-8 gap-4">
      <span className="font-inter text-sm text-background-secondary font-medium">
        Página {paginaAtual} de {totalPaginas}
      </span>
      
      <div className="flex items-center gap-2">
        <button 
          onClick={() => onMudarPagina(paginaAtual - 1)}
          disabled={paginaAtual === 1}
          className="px-4 py-2 rounded-full border border-background-secondary/30 font-inter text-sm text-background-secondary hover:bg-background-secondary/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        
        <div className="flex items-center gap-1">
          {paginas.map((num) => (
            <button 
              key={num}
              onClick={() => onMudarPagina(num)}
              className={`w-8 h-8 flex items-center justify-center rounded-full font-inter text-sm transition-colors ${
                paginaAtual === num 
                  ? "bg-[#D9774A] text-white font-bold" 
                  : "text-background-secondary hover:bg-background-secondary/10"
              }`}
            >
              {num}
            </button>
          ))}
        </div>

        <button 
          onClick={() => onMudarPagina(paginaAtual + 1)}
          disabled={paginaAtual === totalPaginas}
          className="px-4 py-2 rounded-full bg-[#D9774A] text-white font-inter text-sm font-bold hover:bg-[#D9774A]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Próxima
        </button>
      </div>
    </div>
  );
}