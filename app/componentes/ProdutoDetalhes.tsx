import Button from "./button";


interface DetalhesProps {
  nome: string;
  loja: string;
  descricao: string;
  precoOriginal: number;
  precoAtual: number;
  tempoPostagem: string;
  ofertaId: string;
  usuarioId?: string;
}

export default function ProdutoDetalhes({
  nome,
  loja,
  descricao,
  precoOriginal,
  precoAtual,
  tempoPostagem,
  ofertaId,
  usuarioId
}: DetalhesProps) {

  const formatarPreco = (valor: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col h-full">

      <div className="flex items-center gap-2 mb-4">
        <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
          🕒 Postado há {tempoPostagem}
        </span>
      </div>

      <h1 className="font-playfair text-3xl md:text-4xl font-bold text-background-secondary mb-2 leading-tight">
        {nome}
      </h1>

      <p className="font-inter text-sm text-background-secondary/70 mb-4">
        Do "{loja}"
      </p>

      <p className="font-inter text-sm md:text-base text-background-secondary mb-8 leading-relaxed">
        {descricao}
      </p>

      <div className="mt-auto border-t border-gray-100 pt-6">
        <div className="mb-6">
          <span className="line-through text-gray-400 font-inter text-sm block mb-1">
            {formatarPreco(precoOriginal)}
          </span>
          <div className="flex items-end gap-3">
            <span className="font-inter font-bold text-3xl text-background-secondary">
              {formatarPreco(precoAtual)}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center justify-between border border-gray-300 rounded-xl px-4 py-2 sm:w-1/3">
            <button className="text-gray-500 hover:text-background-secondary text-xl font-bold">−</button>
            <span className="font-inter font-semibold">1</span>
            <button className="text-gray-500 hover:text-background-secondary text-xl font-bold">+</button>
          </div>

          <form action={async () => {
            "use server";
            if (!usuarioId) {
              const {redirect} = await import("next/navigation")
              redirect("/login")
              return;
            }


            const criarResgate = (await import("@/app/actions/resgate")).default;
            await criarResgate(usuarioId, ofertaId);
            const { redirect: redirectFinal } = await import("next/navigation");
            redirectFinal("/perfil");


          }} className="flex-1 w-full">
            <Button type="submit" variant="primary" size="lg" className="w-full flex justify-center items-center gap-2 bg-[#D9774A] hover:bg-[#c4683e] rounded-xl">
              {usuarioId ? (
                <>🛒 Adicionar ao Resgate</>
              ) : (
                <>Faça Login para Resgastar</>
              )}
            </Button>
          </form>
        </div>
      </div>

    </div>
  );
}