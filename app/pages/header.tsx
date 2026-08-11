import Image from "next/image";
import Link from "next/link";
import Container from "../componentes/container";
import NavLink from "../componentes/navLink";
import Logo from "../assets/image/logo.png";
import Button from "../componentes/button";
import MenuMobile from "../componentes/MenuMobile";

export default function Header() {
  return (
    <header className="w-full py-3 bg-background-primary relative">
      <Container>
        <div className="flex items-center justify-between">
          
          <Link href="/">
            <Image 
              src={Logo} 
              alt="Logo Salgado Salvo" 
              className="h-10 md:h-14 w-auto" 
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
              <Button variant="outline" size="icon" className="border-background-secondary">
                👤
              </Button>
            </div>

            <MenuMobile />

          </div>

        </div>
      </Container>
    </header>
  );
}