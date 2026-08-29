"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import Button from "../componentes/button";

export default function EsqueciSenha() {
    const [email, setEmail] = useState("");
    const [enviado, setEnviado] = useState(false);
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setCarregando(true);
        setErro("");

        const { error } = await authClient.requestPasswordReset({
            email: email,
            redirectTo: "/nova-senha"
        });

        if (error) {
            setErro(error.message || "Erro ao solicitar recuperação de senha.");
        } else {
            setEnviado(true);
        }
        setCarregando(false);
    };

    return (
        <div className="bg-[#F6EFE5] min-h-screen flex flex-col items-center justify-center font-inter px-6">
            <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h1 className="text-2xl font-playfair font-bold text-center mb-6">Recuperar Senha</h1>
                
                {enviado ? (
                    <div className="text-center">
                        <div className="text-green-600 text-5xl mb-4">✓</div>
                        <p className="text-background-secondary mb-6">
                            Se o e-mail existir no nosso sistema, enviamos um link de recuperação para <strong>{email}</strong>.
                        </p>
                        <Link href="/login" className="text-[#D9774A] hover:underline font-bold">
                            Voltar para o Login
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <p className="text-sm text-gray-600 text-center mb-2">
                            Digite seu e-mail cadastrado e enviaremos um link para você redefinir sua senha.
                        </p>
                        <div>
                            <label className="block text-sm font-medium mb-1">Seu E-mail</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                placeholder="exemplo@email.com"
                            />
                        </div>
                        
                        {erro && <p className="text-red-500 text-sm text-center">{erro}</p>}

                        <Button type="submit" disabled={carregando} className="mt-4 bg-[#D9774A] hover:bg-[#c4683e] text-white py-3 rounded-xl w-full font-bold">
                            {carregando ? "Enviando..." : "Enviar Link de Recuperação"}
                        </Button>
                        
                        <div className="mt-4 text-center">
                            <Link href="/login" className="text-sm text-gray-500 hover:underline">
                                Voltar para o Login
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}