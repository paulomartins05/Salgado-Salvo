import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { buscarParceirosPendentes, aprovarParceiro } from "../actions/admin";

export default async function AdminPage() {
    const reqHeaders = await headers();
    const session = await auth.api.getSession({ headers: reqHeaders });

    if (!session || session.user.role !== "ADMIN") {
        redirect("/");
    }

    const parceirosPendentes = await buscarParceirosPendentes();

    return (
        <div className="container mx-auto p-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Painel de Administração</h1>
            <h2 className="text-xl mb-4">Aprovações Pendentes de Parceiros</h2>

            {parceirosPendentes.length === 0 ? (
                <p className="text-gray-500">Não há usuários aguardando aprovação no momento.</p>
            ) : (
                <div className="bg-white shadow rounded-lg p-6">
                    <ul className="divide-y divide-gray-200">
                        {parceirosPendentes.map((usuario) => (
                            <li key={usuario.id} className="py-4 flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-lg">{usuario.name}</p>
                                    <p className="text-gray-600">{usuario.email} | {usuario.telefone}</p>
                                    <p className="text-blue-600 font-mono mt-1">CNPJ: {usuario.cnpj}</p>
                                </div>

                                <form action={async () => {
                                    "use server";
                                    await aprovarParceiro(usuario.id);
                                }}>
                                    <button
                                        type="submit"
                                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
                                    >
                                        Verificar e Aprovar
                                    </button>
                                </form>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
