"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Button from "../componentes/button";

export default function NovaSenha() {
    const router = useRouter();
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (novaSenha !== confirmarSenha) {
            setErro("As senhas não coincidem.");
            return;
        }

        if (novaSenha.length < 8) {
            setErro("A senha deve ter no mínimo 8 caracteres.");
            return;
        }

        setCarregando(true);
        setErro("");

        const { error } = await authClient.resetPassword({
            newPassword: novaSenha
        });

        if (error) {
            setErro("Link inválido ou expirado. Tente solicitar a recuperação novamente.");
        } else {
            setSucesso(true);
            setTimeout(() => {
                router.push("/login");
            }, 3000);
        }
        setCarregando(false);
    };

    return (
        <div className="bg-[#F6EFE5] min-h-screen flex flex-col items-center justify-center font-inter px-6">
            <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h1 className="text-2xl font-playfair font-bold text-center mb-6">Criar Nova Senha</h1>
                
                {sucesso ? (
                    <div className="text-center">
                        <div className="text-green-600 text-5xl mb-4">✓</div>
                        <p className="text-background-secondary font-bold text-lg mb-2">
                            Senha alterada com sucesso!
                        </p>
                        <p className="text-gray-500 text-sm mb-6">
                            Redirecionando para o login...
                        </p>
                        <Link href="/login" className="text-[#D9774A] hover:underline font-bold">
                            Ir para o Login agora
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Nova Senha</label>
                            <input
                                type="password"
                                value={novaSenha}
                                onChange={(e) => setNovaSenha(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                placeholder="Mínimo 8 caracteres"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Confirmar Nova Senha</label>
                            <input
                                type="password"
                                value={confirmarSenha}
                                onChange={(e) => setConfirmarSenha(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                placeholder="Repita a nova senha"
                            />
                        </div>
                        
                        {erro && <p className="text-red-500 text-sm text-center">{erro}</p>}

                        <Button type="submit" disabled={carregando} className="mt-4 bg-[#D9774A] hover:bg-[#c4683e] text-white py-3 rounded-xl w-full font-bold">
                            {carregando ? "Salvando..." : "Redefinir Senha"}
                        </Button>
                    </form>
                )}
            </div>
        </div>
    );
}
