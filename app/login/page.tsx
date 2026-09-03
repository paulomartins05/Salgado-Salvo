"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; 

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useRouter } from "next/navigation";

import LockIcon from "../assets/icon/lock-login.svg";
import EyeOpenIcon from "../assets/icon/eye-open-login.svg";     
import EyeClosedIcon from "../assets/icon/eye-close-login.svg"; 

import { authClient } from "@/lib/auth-client";
import InputForm from "../componentes/InputForm";
import { appToast } from "@/lib/toast";

const loginSchema = z.object ( {
  email: z.string().min(1, "O Email é obrigatorio").email("Digite um email valido"),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  lembrarMe: z.boolean().optional(),
})

type loginFormInputs = z.infer<typeof loginSchema>

export default function LoginPage() {
  
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<loginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      lembrarMe: false
    }
  })

  const onSubmit = async(data: loginFormInputs) => {
    await authClient.signIn.email({
      email: data.email,
      password: data.senha,
      rememberMe: data.lembrarMe,
      callbackURL: "/"

    }, {
      onRequest: () => {
        console.log("Carregando")
      },
      onSuccess: () => {
        console.log("Foi")
        appToast.loginSuccess()
      },
      onError: (ctx) => {
        appToast.loginError(ctx.error.message)
      }
    })
  }

  const toggleMostrarSenha = () => setMostrarSenha(!mostrarSenha);
  
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

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            
            <InputForm 
              label="Email ou Nome de Usuário"
              type="text"
              className="bg-[#F6EFE5]/60" 
              {...register("email")}
              error={errors.email?.message} 
            />

            <div className="flex flex-col">
              <InputForm 
                label="Senha"
                type={mostrarSenha ? "text" : "password"}
                className="bg-[#F6EFE5]/60"
                icon={<Image src={LockIcon} alt="Cadeado" width={20} height={20} className="opacity-50" />}
                rightElement={
                  <button type="button" onClick={toggleMostrarSenha} className="text-gray-400 hover:text-[#D9774A] transition-colors focus:outline-none">
                    <Image src={mostrarSenha ? EyeClosedIcon : EyeOpenIcon} alt="Mostrar" width={22} height={22} className="opacity-60" />
                  </button>
                }
                {...register("senha")}
                error={errors.senha?.message}
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
                id="lembrarMe"
                className="w-4 h-4 rounded border-gray-300 text-[#D9774A] focus:ring-[#D9774A] cursor-pointer"
                {...register("lembrarMe")}
              />
              <label htmlFor="lembrarMe" className="text-sm text-background-secondary font-medium cursor-pointer hover:text-[#D9774A] transition-colors">
                Lembrar-me
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 bg-[#D9774A] hover:bg-[#c4683e] text-white font-bold text-lg py-3 rounded-xl shadow-[0_4px_14px_0_rgba(217,119,74,0.39)] transform transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "ENTRANDO..." : "ENTRAR"}
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