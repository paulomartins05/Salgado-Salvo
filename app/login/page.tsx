"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; 

import LockIcon from "../assets/icon/lock-login.svg";
import EyeOpenIcon from "../assets/icon/eye-open-login.svg";     
import EyeClosedIcon from "../assets/icon/eye-close-login.svg"; 

import { authClient } from "@/lib/auth-client";
import InputForm from "../componentes/InputForm";

export default function LoginPage() {

  const [formData, setFormData] = useState({
    email: "",
    senha: "",
    lembrarMe: false,
  });
  
  const [mostrarSenha, setMostrarSenha] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormData((prev) => ({
      ...prev, 
      [name]: type === "checkbox" ? checked : value, 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await authClient.signIn.email({
      email: formData.email,
      password: formData.senha,
      callbackURL: "/"
    }, {
      onRequest: () => {},
      onSuccess:(ctx) => {
        alert("SUCESSO !!!!!!!!")
        console.log("logado: ", ctx)
        window.location.href = "/";
      },
      onError: (ctx) => {
        alert("Erro ao logar")
        console.log(ctx.error.message)
      }
    })
  };

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
            
            <InputForm 
              label="Email ou Nome de Usuário"
              type="text"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="bg-[#F6EFE5]/60" 
            />

            <div className="flex flex-col">
              <InputForm 
                label="Senha"
                type={mostrarSenha ? "text" : "password"}
                name="senha"
                required
                value={formData.senha}
                onChange={handleChange}
                className="bg-[#F6EFE5]/60"
                
                icon={<Image src={LockIcon} alt="Cadeado" width={20} height={20} className="opacity-50" />}
                
                rightElement={
                  <button
                    type="button" 
                    onClick={toggleMostrarSenha} 
                    className="text-gray-400 hover:text-[#D9774A] transition-colors focus:outline-none"
                  >
                    <Image 
                      src={mostrarSenha ? EyeClosedIcon : EyeOpenIcon} 
                      alt={mostrarSenha ? "Ocultar senha" : "Mostrar senha"} 
                      width={22} 
                      height={22} 
                      className="opacity-60 hover:opacity-100 transition-opacity"
                    />
                  </button>
                }
              />
              
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