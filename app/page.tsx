import Header from "./pages/header";
import HeroSection from "./pages/hero-section";
import ExploreLanches from "./pages/ExploreLanches";
import ResgatesDisponiveis from "./pages/ResgatesDisponiveis";

export default function Home() {
  return (
    <>
      <Header />
      <hr className="opacity-10"/>
      <HeroSection />
      
      <ExploreLanches />
      <ResgatesDisponiveis />
    </>
  );
}