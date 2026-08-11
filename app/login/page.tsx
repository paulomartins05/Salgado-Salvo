"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; 

import LockIcon from "../assets/icon/lock-login.svg";
import EyeOpenIcon from "../assets/icon/eye-open-login.svg";     
import EyeClosedIcon from "../assets/icon/eye-close-login.svg"; 

export default function LoginPage() {


  // Para pegar os dados, formData guarda os atuais, setFormData permite alterar os dados
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
    lembrarMe: false,
  });

  
  const [mostrarSenha, setMostrarSenha] = useState(false);

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Extrai os dados do campo
    const { name, value, type, checked } = e.target;
    
    setFormData((prev) => ({
      ...prev, 
      [name]: type === "checkbox" ? checked : value, 
    }));
  };

  // É Chamada Quando é Clicado em "Entrar"
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Teste manual, dos dados de login
    console.log("Tentativa de login com os dados:", formData);
    
    // Chamada para a API
    alert("Login simulado com sucesso!"); 
  };

 
  // Mostra a senha
  const toggleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  return (
    <div className="bg-[#F6EFE5] min-h-screen flex flex-col items-center justify-center font-inter relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[#D9774A] rounded-full mix-blend-multiply filter blur-[150px] opacity-10 pointer-events-none"></div>

      <div className="z-10 w-full max-w-md px-6">
        
        <div className="text-center mb-8">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-background-secondary mb-2">
            Acessar sua Conta
          </h1>
        </div>

        <div className="bg-[#fcfaf8] border border-[#e8dfd5] shadow-lg rounded-3xl p-8 relative">
          <h2 className="text-2xl font-bold text-background-secondary mb-6">Entrar</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            
            <div className="flex flex-col gap-2">
              <label className="text-sm text-background-secondary/80 font-medium">Email ou Nome de Usuário</label>
              <input
                type="text"
                name="email" 
                required
                value={formData.email}
                onChange={handleChange} 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#F6EFE5]/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] focus:ring-2 focus:ring-[#D9774A] focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-background-secondary/80 font-medium">Senha</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center">
                  <Image src={LockIcon} alt="Ícone de Cadeado" width={20} height={20} className="opacity-50" />
                </span>
                
                <input
                  type={mostrarSenha ? "text" : "password"} // Verifica se é para mostrar ou não a senha
                  name="senha" 
                  required
                  value={formData.senha}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 bg-[#F6EFE5]/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] focus:ring-2 focus:ring-[#D9774A] focus:border-transparent outline-none transition-all"
                />
                
                <button
                  type="button" 
                  onClick={toggleMostrarSenha} // Inverte o true/false 
                  className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-400 hover:text-[#D9774A] transition-colors"
                >
                  <Image 
                    src={mostrarSenha ? EyeClosedIcon : EyeOpenIcon} 
                    alt={mostrarSenha ? "Ocultar senha" : "Mostrar senha"} 
                    width={22} 
                    height={22} 
                    className="opacity-60 hover:opacity-100 transition-opacity"
                  />
                </button>
              </div>
              
              <div className="flex justify-end mt-1">
                <Link href="/recuperar-senha" className="text-xs text-[#D9774A] font-medium hover:underline underline-offset-2">
                  Esqueceu sua senha?
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                name="lembrarMe"
                id="lembrarMe"
                checked={formData.lembrarMe}
                onChange={handleChange} 
                className="w-4 h-4 rounded border-gray-300 text-[#D9774A] focus:ring-[#D9774A] cursor-pointer"
              />
              <label htmlFor="lembrarMe" className="text-sm text-background-secondary font-medium cursor-pointer hover:text-[#D9774A] transition-colors">
                Lembrar-me
              </label>
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-[#D9774A] hover:bg-[#c4683e] text-white font-bold text-lg py-3 rounded-xl shadow-[0_4px_14px_0_rgba(217,119,74,0.39)] hover:shadow-[0_6px_20px_rgba(217,119,74,0.23)] transform hover:-translate-y-0.5 transition-all duration-200"
            >
              ENTRAR
            </button>

            <div className="mt-4 text-center text-sm text-background-secondary font-medium">
              Não tem uma conta?{" "}
              <Link href="/cadastro" className="text-[#D9774A] font-bold hover:underline underline-offset-2">
                Cadastre-se agora
              </Link>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}