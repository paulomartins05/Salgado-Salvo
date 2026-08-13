"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; 

// Auth-Client, do Better-Auth
import { authClient } from "@/lib/auth-client"


import EyeOpenIcon from "../assets/icon/eye-open-login.svg";     
import EyeClosedIcon from "../assets/icon/eye-close-login.svg"; 

export default function CadastroPage() {
  // Tipo de Conta 
  const [tipoConta, setTipoConta] = useState<"consumidor" | "parceiro">("parceiro");

  // Para pegar os dados, formData guarda os atuais, setFormData permite alterar os dados
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    telefone: "",
    localizacao: "",
    cnpj: "",
  });

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  // Extrai os dados
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    
    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem. Por favor, verifique.");
      return;
    }

    // Cadastrando usuario
    const { data, error} = await authClient.signUp.email({
      name: formData.nome,
      email: formData.email,
      password: formData.senha,
      callbackURL: "/"

    }, {
      onRequest: () => { // Enquanto roda

      },
      onSuccess: () => { 
        alert("SUCESSO!!!!!")
      }, 
      onError: (ctx) => {
        alert("Deu erro!")
        console.log(ctx.error.message)
      }
    })
    
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen flex flex-col items-center justify-center font-inter py-10">
      
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-2">
          Crie sua Conta
        </h1>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-xl w-full max-w-lg overflow-hidden">
        
        {/* SISTEMA DE ABAS */}
        <div className="flex w-full border-b border-gray-200">
          
          {/* Aba Consumidor */}
          <button
            type="button" 
            className={`flex-1 py-4 text-center font-medium transition-colors ${
              tipoConta === "consumidor" 
                ? "text-gray-900 border-b-2 border-[#D9774A]" 
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setTipoConta("consumidor")}
          >
            Consumidor
          </button> 

          {/* Aba Parceiro */}
          <button
            type="button"
            className={`flex-1 py-4 text-center font-medium transition-colors ${
              tipoConta === "parceiro" 
                ? "text-gray-900 border-b-2 border-[#D9774A]" 
                : "text-gray-500 hover:text-gray-700"
            }`}
            // Ao clicar, muda o estado para "parceiro"
            onClick={() => setTipoConta("parceiro")}
          >
            Parceiro
          </button>
        </div>

        {/* ÁREA DO FORMULÁRIO */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 flex flex-col gap-5">
          
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700 font-medium">Nome Completo <span className="text-[#D9774A]">*</span></label>
            <input
              type="text"
              name="nome"
              required
              value={formData.nome}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#D9774A] focus:border-[#D9774A] outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-700 font-medium">Senha <span className="text-[#D9774A]">*</span></label>
              <div className="relative">
                <input
                  type={mostrarSenha ? "text" : "password"}
                  name="senha"
                  required
                  value={formData.senha}
                  onChange={handleChange}
                  className="w-full px-3 py-2 pr-10 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#D9774A] focus:border-[#D9774A] outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute inset-y-0 right-2 flex items-center justify-center text-gray-400"
                >
                  <Image 
                    src={mostrarSenha ? EyeClosedIcon : EyeOpenIcon} 
                    alt={mostrarSenha ? "Ocultar senha" : "Mostrar senha"} 
                    width={20} 
                    height={20} 
                    className="opacity-60 hover:opacity-100 transition-opacity"
                  />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-700 font-medium">Confirmar Senha <span className="text-[#D9774A]">*</span></label>
              <div className="relative">
                <input
                  type={mostrarConfirmarSenha ? "text" : "password"}
                  name="confirmarSenha"
                  required
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  className="w-full px-3 py-2 pr-10 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#D9774A] focus:border-[#D9774A] outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                  className="absolute inset-y-0 right-2 flex items-center justify-center text-gray-400"
                >
                  <Image 
                    src={mostrarConfirmarSenha ? EyeClosedIcon : EyeOpenIcon} 
                    alt={mostrarConfirmarSenha ? "Ocultar senha" : "Mostrar senha"} 
                    width={20} 
                    height={20} 
                    className="opacity-60 hover:opacity-100 transition-opacity"
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700 font-medium">Email <span className="text-[#D9774A]">*</span></label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#D9774A] focus:border-[#D9774A] outline-none transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700 font-medium">Telefone / WhatsApp <span className="text-[#D9774A]">*</span></label>
            <input
              type="tel"
              name="telefone"
              required
              value={formData.telefone}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#D9774A] focus:border-[#D9774A] outline-none transition-colors"
            />
          </div>

          {/* CAMPOS EXCLUSIVOS DO PARCEIRO */}
          {tipoConta === "parceiro" && (
            <>
              {/* Campo: Localização */}
              <div className="flex flex-col gap-1 animate-fadeIn"> 
                <label className="text-sm text-gray-700 font-medium">Localização Completa <span className="text-[#D9774A]">*</span></label>
                <input
                  type="text"
                  name="localizacao"
                  required
                  placeholder="Ex: Rua das Flores, 100 - Bairro Centro"
                  value={formData.localizacao}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#D9774A] focus:border-[#D9774A] outline-none transition-colors"
                />
              </div>

              {/* Campo CNPJ */}
              <div className="flex flex-col gap-1 animate-fadeIn">
                <label className="text-sm text-gray-700 font-medium">CNPJ <span className="text-[#D9774A]">*</span></label>
                <input
                  type="text"
                  name="cnpj"
                  required
                  placeholder="00.000.000/0000-00"
                  value={formData.cnpj}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#D9774A] focus:border-[#D9774A] outline-none transition-colors"
                />
                <span className="text-xs text-gray-500">(Obrigatório para Parceiros)</span>
              </div>
            </>
          )}

          {/* Botão de Submit */}
          <button
            type="submit"
            className="w-full mt-2 bg-[#D9774A] hover:bg-[#c5673d] text-white font-bold py-3 rounded-lg shadow transition-colors"
          >
            FINALIZAR CADASTRO
          </button>

          {/* Link para o Login */}
          <div className="mt-2 text-center text-sm text-gray-600">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-[#D9774A] font-semibold hover:underline">
              Entre agora.
            </Link>
          </div>
          
        </form>
      </div>
    </div>
  );
}