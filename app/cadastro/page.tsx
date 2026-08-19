"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image"; 

import SemFotoDePerfil from "../assets/image/sem-foto-de-perfil.jpg"

import { authClient } from "@/lib/auth-client"
import { uploadImagemPerfil } from "@/app/actions/upload";

import EyeOpenIcon from "../assets/icon/eye-open-login.svg";     
import EyeClosedIcon from "../assets/icon/eye-close-login.svg"; 
import DeleteIcon from "../assets/icon/delete-photo-profile.svg"




export default function CadastroPage() {
  const [tipoConta, setTipoConta] = useState<"consumidor" | "parceiro">("parceiro");

  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const [fotoPerfil, setFotoPerfil] = useState<File | null>(null); 

  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleRemoverFoto = () => {
    setFotoPerfil(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }


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

    setIsSubmitting(true)

    try {

      let fotoUrlCloudinary: string | undefined = undefined

      if (fotoPerfil) {

        const uploadData = new FormData()
        uploadData.append("imagem", fotoPerfil)

        const url = await uploadImagemPerfil(uploadData)

        if (url) {
          fotoUrlCloudinary = url
        }
      }
      
      const payload = {
        name: formData.nome,
        email: formData.email,
        password: formData.senha,
        image: fotoUrlCloudinary,
        telefone: formData.telefone,
        role: tipoConta === "parceiro" ? "PARCEIRO" : "CONSUMIDOR",
        cnpj: tipoConta === "parceiro" ? formData.cnpj : undefined,
        localizacao: tipoConta === "parceiro" ? formData.localizacao : undefined,
  
        callbackURL: "/"
      }
  
      const { data, error} = await authClient.signUp.email( payload as any, {
        onRequest: () => { // Enquanto roda
  
        },
        onSuccess: () => { 
          alert("SUCESSO!!!!!")
        }, 
        onError: (ctx) => {
          alert("Deu erro!")
          console.log(ctx.error.message)
          setIsSubmitting(false);
        }
      })
    } catch (error) {
      console.error(error)
      alert("Ocorreu um erro")
      setIsSubmitting(false)
      
    }

    
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen flex flex-col items-center justify-center font-inter py-10">
      
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-2">
          Crie sua Conta
        </h1>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-xl w-full max-w-lg overflow-hidden">
        
        <div className="flex w-full border-b border-gray-200">
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

          <button
            type="button" 
            className={`flex-1 py-4 text-center font-medium transition-colors ${
              tipoConta === "parceiro" 
                ? "text-gray-900 border-b-2 border-[#D9774A]" 
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setTipoConta("parceiro")}
          >
            Parceiro
          </button>
        </div>

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

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700 font-medium">Foto de Perfil <span className="text-gray-400 font-normal">(OPCIONAL)</span> </label>
            <div className="flex items-center gap-2">
              <input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef}
                onChange={(e) => {
                  if(e.target.files && e.target.files.length > 0) {
                    setFotoPerfil(e.target.files[0]);
                  } else {
                    setFotoPerfil(null);
                  }
                }}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#D9774A] focus:border-[#D9774A] outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#fdf3ef] file:text-[#D9774A] hover:file:bg-[#fae6dd] cursor-pointer" 
              />

              {fotoPerfil && (
                <button 
                  type="button"
                  onClick={handleRemoverFoto}
                  title="Remover Foto Selecionada"
                  className="flex-shrink-0 p-2 bg-red-50 hover:bg-red-100 border border-red-100 rounded-lg transition-colors flex items-center justify-center"
                >
                  <Image 
                    src={DeleteIcon}
                    alt="Excluir foto"
                    width={22}
                    height={22}
                    className="opacity-70 hover:opacity-100 transition-opacity"
                  />
                </button>
              )}
            </div>
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

          {tipoConta === "parceiro" && (
            <>
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

          {/* 4. Botão bloqueado com feedback visual enquanto carrega */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full mt-2 font-bold py-3 rounded-lg shadow transition-all ${
              isSubmitting 
                ? "bg-gray-400 text-gray-200 cursor-not-allowed" 
                : "bg-[#D9774A] hover:bg-[#c5673d] text-white"
            }`}
          >
            {isSubmitting ? "CRIANDO CONTA..." : "FINALIZAR CADASTRO"}
          </button>

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