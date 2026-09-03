
"use client";

import { useState } from "react";
import Button from "../componentes/button"; 
import { appToast } from "@/lib/toast";

interface BotaoResgateProps {
  variant?: "primary" | "outline"; 
  children: React.ReactNode; 
}

export default function BotaoResgate({ 
  variant = "primary", 
  children
}: BotaoResgateProps) {
  
  const [carregando, setCarregando] = useState(false);

  const simularResgate = () => {
    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
      appToast.sucesso("Salgado salvo com sucesso!");
    }, 2000);
  };

  return (
    <Button 
      variant={variant} 
      size="lg"
      isLoading={carregando} 
      onClick={simularResgate}
    >
      {children}
    </Button>
  );
}