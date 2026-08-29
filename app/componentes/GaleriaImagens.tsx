"use client";

import { useState } from "react";
import Image from "next/image";

interface GaleriaImagensProps {
  imagens: string[];
  titulo: string;
}

export default function GaleriaImagens({ imagens, titulo }: GaleriaImagensProps) {
  const imagensValidas = imagens && imagens.length > 0 
    ? imagens 
    : ["https://cdn-icons-png.flaticon.com/512/3225/3225091.png"];
    
  const [imagemAtiva, setImagemAtiva] = useState(imagensValidas[0]);

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-[#EBECEE] rounded-3xl w-full h-75 md:h-125 relative flex items-center justify-center p-8 overflow-hidden">
        <Image
          src={imagemAtiva}
          alt={titulo}
          fill
          className="object-contain drop-shadow-xl p-8"
        />
      </div>

      {imagensValidas.length > 1 && (
        <div className="flex gap-4">
          {imagensValidas.map((img, index) => (
            <div 
              key={index} 
              onClick={() => setImagemAtiva(img)}
              className={`bg-[#EBECEE] border-2 rounded-xl w-20 h-20 relative cursor-pointer transition-colors overflow-hidden ${
                imagemAtiva === img ? "border-[#D9774A]" : "border-transparent hover:border-[#D9774A]/50"
              }`}
            >
              <Image src={img} alt={`Miniatura ${index + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
