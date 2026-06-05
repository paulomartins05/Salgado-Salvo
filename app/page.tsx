import Button from "./componentes/button";
import Container from "./componentes/container";
import Logo from "./assets/image/logo.png"
import Image from "next/image";
import Text from "./componentes/text";


export default function Home() {
  return (
    <Container className="flex items-center justify-between" as="header">
      <a href="/" >
        <Image
        src={Logo}
        alt="Logo da Salgado Salvo"
        className="h-18 md:h-20 w-auto"
        
        />
      
      </a>
      <nav>
      </nav>

      <div>
        <Text as="h1">
          46545646

        </Text>
      </div>
    </Container>
    
  );
}
