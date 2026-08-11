import Image from "next/image";
import Container from "../componentes/container";
import Text from "../componentes/text"; 
import Button from "../componentes/button"; 
import RadarImage from "../assets/image/hero-section-image.png"; 
import ExploreLanches from "./ExploreLanches"; 

export default function HeroSection() {
  return (
    <>
      <section className="py-12 md:py-24 bg-background-primary">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            
            <div className="flex flex-col gap-6 md:pr-10">
              
              <Text variant="playfair" as="h1" className="text-background-secondary leading-tight">
                Salgados Incríveis, <br />
                Preços Justos: <br />
                <span className="text-laranja-destaque">Salve sua Refeição!</span>
              </Text>

              <Text variant="inter" as="p" className="text-background-secondary opacity-90 max-w-md">
                Lanches fresquinhos produzidos hoje, com descontos imperdíveis. Ajude-nos a evitar o desperdício!
              </Text>

              <div className="flex items-center gap-4 mt-2">
                <Button variant="primary" size="md">
                  Ver Resgates de Hoje
                </Button>
                <Button variant="outline" size="md">
                  Vender
                </Button>
              </div>
              
            </div>

            <div className="flex justify-center md:justify-end">
              <Image 
                src={RadarImage} 
                alt="Radar buscando salgados próximos" 
                className="w-full max-w-125 h-auto object-contain mix-blend-multiply"
              />
            </div>

          </div>
        </Container>
      </section>
    </>
  );
}