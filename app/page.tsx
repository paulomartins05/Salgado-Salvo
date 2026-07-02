import Header from "./pages/header";
import HeroSection from "./pages/hero-section";

export default function Home() {
  return (
    <>
      <Header />
      <hr className="opacity-10"/>
      <HeroSection />
    </>
  );
}