import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Container from "../componentes/container";
import Header from "../pages/header";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { headers } from "next/headers";

export default async function carrinhoPage() {

    const reqHeaders = await headers()
    const session = await auth.api.getSession({
        headers: reqHeaders
    })

    if (!session?.user || session.user.role != "CONSUMIDOR") {
        redirect("/")
    }

    const meusResgates = await prisma.resgate.findMany({
        where: {
            userId: session.user.id,
            status: "PENDENTE"
        },
        include: {
            oferta: true
        },
        orderBy: {
            createdAt: "desc",
        }
    })

    return (
        <div className="bg-[#F6EFE5] min-h-screen flex flex-col font-inter text-background-secondary">
            <Header />
            <hr className="opacity-10 border-background-secondary" />
            <main className="py-8 grow">
                <Container>
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl font-playfair font-bold mb-8">Meus Resgates</h1>
                        {meusResgates.length === 0 ? (
                            <div className="bg-white p-12 rounded-2xl shadow-sm text-center">
                                <span className="text-4xl mb-4 block">🛒</span>
                                <h2 className="text-xl font-bold mb-2">Seu carrinho está vazio</h2>
                                <p className="text-gray-500 mb-6">Você ainda não reservou nenhum produto.</p>
                                <Link href="/resgates" className="text-[#D9774A] font-bold hover:underline">
                                    Ver ofertas disponíveis
                                </Link>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {meusResgates.map((resgate) => (
                                    <div key={resgate.id} className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center gap-6 border border-gray-100">

                                        <img
                                            src={resgate.oferta.imagemUrl?.[0] || "https://cdn-icons-png.flaticon.com/512/3225/3225091.png"}
                                            alt={resgate.oferta.titulo}
                                            className="w-24 h-24 object-cover rounded-xl"
                                        />
                                        <div className="flex-1 text-center sm:text-left">
                                            <h3 className="font-bold text-lg">{resgate.oferta.titulo}</h3>
                                            <p className="text-sm text-gray-500 mb-1">Status: <strong className={resgate.status === "PENDENTE" ? "text-orange-500" : "text-green-600"}>{resgate.status}</strong></p>
                                            <p className="font-semibold text-[#6B705C]">
                                                Valor: R$ {Number(resgate.oferta.precoResgate).toFixed(2).replace('.', ',')}
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-center min-w-[150px]">
                                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Seu Código PIN</p>
                                            {resgate.status === "PENDENTE" ? (
                                                <p className="text-2xl font-black text-[#D9774A] tracking-widest">{resgate.codigoPin}</p>
                                            ) : (
                                                <p className="text-lg font-bold text-gray-400 line-through">{resgate.codigoPin}</p>
                                            )}
                                        </div>

                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </Container>
            </main>
        </div>
    );
}

