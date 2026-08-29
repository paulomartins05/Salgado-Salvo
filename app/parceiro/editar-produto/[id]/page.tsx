import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Container from "@/app/componentes/container";
import Header from "@/app/pages/header";
import Button from "@/app/componentes/button";
import Link from "next/link";
import { editarOferta } from "@/app/actions/ofertas";

export default async function EditarProduto({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const id = (await params).id;
    const oferta = await prisma.oferta.findUnique({
        where: { id }
    });
    if (!oferta) {
        redirect("/parceiro/perfil?aba=produtos");

    }

    const dataValidadeFormatada = new Date(oferta.dataValidade.getTime() - (oferta.dataValidade.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);

    return (
        <div className="bg-[#F6EFE5] min-h-screen flex flex-col font-inter text-background-secondary">
            <Header />
            <hr className="opacity-10 border-background-secondary" />
            <main className="py-8 grow">
                <Container>
                    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-2xl font-playfair font-bold">Editar Produto</h1>
                            <Link href="/parceiro/perfil?aba=produtos" className="text-sm text-gray-500 hover:underline">
                                Cancelar
                            </Link>
                        </div>
                        <form action={editarOferta} className="flex flex-col gap-4">
                            <input type="hidden" name="id" value={oferta.id} />
                            <div>
                                <label className="block text-sm font-medium mb-1">Nome do Produto</label>
                                <input type="text" name="titulo" defaultValue={oferta.titulo} required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Descrição</label>
                                <textarea name="descricao" defaultValue={oferta.descricao} required rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg"></textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Categoria</label>
                                    <select name="categoria" defaultValue={oferta.categoria} required className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white">
                                        <option value="">Selecione uma categoria...</option>
                                        <option value="Salgados">Salgados</option>
                                        <option value="Doces">Doces</option>
                                        <option value="Assados">Assados</option>
                                        <option value="Bolos">Bolos</option>
                                        <option value="Outros">Outros</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Quantidade</label>
                                    <input type="number" name="quantidade" defaultValue={oferta.quantidade} required min="0" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Preço Original (R$)</label>
                                    <input type="number" step="0.01" name="precoOriginal" defaultValue={oferta.precoOriginal} required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Preço Resgate (R$)</label>
                                    <input type="number" step="0.01" name="precoResgate" defaultValue={oferta.precoResgate} required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Data e Hora de Validade</label>
                                <input type="datetime-local" name="dataValidade" defaultValue={dataValidadeFormatada} required className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Imagem do Produto (Opcional)</label>
                                {oferta.imagemUrl && oferta.imagemUrl.length > 0 && (
                                    <div className="mb-3">
                                        <p className="text-xs text-gray-500 mb-1">Imagem atual:</p>
                                        <img src={oferta.imagemUrl[0]} alt="Imagem atual" className="h-24 w-24 object-cover rounded-lg border border-gray-200" />
                                    </div>
                                )}
                                <input type="file" name="imagem" multiple accept="image/png, image/jpeg, image/webp" className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white" />
                                <p className="text-xs text-gray-500 mt-1">Envie até 3 novos arquivos caso queira trocar as imagens atuais.</p>
                            </div>
                            <Button type="submit" className="mt-4 bg-[#D9774A] hover:bg-[#c4683e] text-white py-3 rounded-xl w-full">
                                Salvar Alterações
                            </Button>
                        </form>
                    </div>
                </Container>
            </main>
        </div>
    );
}

