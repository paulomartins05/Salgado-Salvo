"use client"

import Image from "next/image";
import Link from "next/link";
import Container from "../componentes/container";
import NavLink from "../componentes/navLink";
import Logo from "../assets/image/logo-salgado-salvo.svg";
import Button from "../componentes/button";
import MenuMobile from "../componentes/MenuMobile";

import { authClient } from "@/lib/auth-client";

export default function Header() {
  const {data:session} = authClient.useSession()

  const usuario = session?.user

  return (
    <header className="w-full py-3 bg-background-primary relative">
      <Container>
        <div className="flex items-center justify-between">
          
          <Link href="/">
            <Image 
              src={Logo} 
              alt="Logo Salgado Salvo" 
              className="h-10 md:h-20 w-auto" 
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <NavLink href="/">Início</NavLink>
            
            <NavLink href="/resgates">Resgates do Dia</NavLink>
            
            <NavLink href="/parceiro/novo-resgate">Cadastrar Resgate</NavLink>
            <NavLink href="/contato">Contato</NavLink>
          </nav>

          <div className="flex items-center gap-4">
            
            <Button variant="outline" size="icon">
              🛒
            </Button>
            
            <div className="hidden md:block">
              {usuario ? (
                <Link href="/perfil">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="border-background-secondary p-0 overflow-hidden" 
                    title="Acessar meu perfil"
                  >
                    {usuario.image ? (
                      <img 
                        src={usuario.image} 
                        alt={`Perfil de ${usuario.name}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="font-bold text-background-secondary uppercase text-lg">
                        {usuario.name ? usuario.name.charAt(0) : "👤"}
                      </span>
                    )}
                  </Button>
                </Link>
              ) : (
                <Link href={"/login"}>
                  <Button className="bg-[#D9774A] hover:bg-[#c4683e] text-white border-transparent">
                    Entrar
                  </Button>
                </Link>
              )}
            </div>

            <MenuMobile />

          </div>

        </div>
      </Container>
    </header>
  );
}