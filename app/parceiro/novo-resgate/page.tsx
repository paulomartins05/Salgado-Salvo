"use client";

import { useState } from "react";
import Header from "../../pages/header"; 
import Container from "../../componentes/container"; 

import { criarOferta } from "@/app/actions/ofertas";

const categoriasDisponiveis = [
  { id: "Salgados", label: "Salgados", icon: "🥟" },
  { id: "Doces", label: "Doces", icon: "🍩" },
  { id: "Assados", label: "Assados", icon: "🥐" },
  { id: "Bolos", label: "Bolos", icon: "🍰" },
  { id: "Outros", label: "Outros", icon: "🛒" },
];

export default function CadastrarNovoResgate() {

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    categoria: "", 
    precoOriginal: "",
    precoResgate: "",
    quantidade: 1,
    localizacao: "", 
    validade: "",
    termosAceitos: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    
    if (!formData.termosAceitos) {
      alert("Você precisa aceitar os Termos de Contrato para publicar o resgate.");
      return;
    }

    if(!formData.categoria) {
      alert("Favor selecionar uma categoria")
    }


    setIsSubmitting(true)

    try {
      const serverData = new FormData();

      serverData.append("titulo", formData.nome)
      serverData.append("descricao", formData.descricao)
      serverData.append("precoOriginal", formData.precoOriginal)
      serverData.append("precoDesconto", formData.precoResgate)
      serverData.append("quantidade", formData.quantidade.toString())

      const horasEmMilissegundos = parseInt(formData.validade) * 60 * 60 * 1000
      const dataExpiraçao = new Date(Date.now() + horasEmMilissegundos)
      serverData.append("dataValidade", dataExpiraçao.toISOString())

      
      serverData.append("categoria", formData.categoria)
      serverData.append("localizacao", formData.localizacao)
      

      await criarOferta(serverData)

      alert(`Sucesso!!!!!!!!! "${formData.nome}", foi criado`)

      window.location.href = "/"
      
    } catch (error: any) {
      alert(error.message)
      console.log(error)  
    } finally {
      setIsSubmitting(false)
    }

    
  };

  return (
    <div className="bg-[#F6EFE5] min-h-screen flex flex-col font-inter">
      <Header />
      <hr className="opacity-10 border-background-secondary" />

      <main className="py-10 flex-grow">
        <Container>
          
          <div className="mb-8 text-center md:text-left">
            <div className="text-sm text-[#B87042] mb-3">
              Dashboard {'>'} Resgates {'>'} <span className="font-semibold text-background-secondary">Novo Cadastro</span>
            </div>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-background-secondary">
              Cadastrar Novo Lanche para Resgate
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="bg-[#fcfaf8] border border-[#e8dfd5] shadow-sm rounded-3xl p-6 md:p-10 max-w-5xl mx-auto flex flex-col gap-8 relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D9774A] rounded-full mix-blend-multiply filter blur-[100px] opacity-5 pointer-events-none"></div>

            <div className="relative z-10">
              <h2 className="text-lg font-bold text-background-secondary mb-4">Informações do Lanche</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-background-secondary/80 font-medium">Nome do Lanche</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-xl">🏷️</span>
                    <input 
                      type="text" name="nome" required value={formData.nome} onChange={handleChange}
                      placeholder="Ex: Coxinha Cremosa"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] focus:ring-2 focus:ring-[#D9774A] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm text-background-secondary/80 font-medium">Adicionar Fotos (máx 3)</label>
                  <button type="button" className="w-full h-[50px] border-2 border-dashed border-[#D9774A]/50 text-[#D9774A] rounded-xl flex items-center justify-center gap-2 hover:bg-[#D9774A]/10 transition-colors bg-white">
                    📷 <span>Fazer Upload</span>
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm text-background-secondary/80 font-medium">Descrição detalhada</label>
                  <div className="relative">
                     <span className="absolute top-3 left-3 flex items-center text-gray-400">📝</span>
                    <textarea 
                      name="descricao" required value={formData.descricao} onChange={handleChange}
                      placeholder="Ingredientes, validade, etc..."
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] focus:ring-2 focus:ring-[#D9774A] focus:border-transparent outline-none transition-all resize-none h-[50px]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10">
              <h2 className="text-lg font-bold text-background-secondary mb-4">Tipo de Produto</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {categoriasDisponiveis.map((cat) => (
                  <div 
                    key={cat.id}
                    onClick={() => setFormData({ ...formData, categoria: cat.id })}
                    className={`cursor-pointer flex flex-col items-center justify-center py-4 px-2 rounded-2xl border-2 transition-all duration-300 ${
                      formData.categoria === cat.id 
                        ? "bg-[#D9774A] border-[#D9774A] text-white shadow-md transform scale-[1.02]" 
                        : "bg-white border-gray-200 text-background-secondary hover:border-[#D9774A]/40 hover:shadow-sm"
                    }`}
                  >
                    <div className="w-full flex justify-start px-3 mb-1">
                      <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${formData.categoria === cat.id ? 'border-white' : 'border-gray-300'}`}>
                        {formData.categoria === cat.id && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                      </div>
                    </div>
                    <span className="text-4xl mb-2 drop-shadow-sm">{cat.icon}</span>
                    <span className="font-medium text-sm">{cat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10">
              <h2 className="text-lg font-bold text-background-secondary mb-4">Preços e Descontos</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-background-secondary/80 font-medium">Preço Normalmente (R$)</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">R$</span>
                    <input 
                      type="number" step="0.01" name="precoOriginal" required value={formData.precoOriginal} onChange={handleChange}
                      placeholder="6,00"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-500 line-through focus:ring-2 focus:ring-gray-300 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#2E7D32]">Preço de Venda (Menor Valor)</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center font-bold text-[#2E7D32]">R$</span>
                    <input 
                      type="number" step="0.01" name="precoResgate" required value={formData.precoResgate} onChange={handleChange}
                      placeholder="3,90"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-[#4CAF50]/40 bg-[#E8F5E9] font-bold text-background-secondary focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
                    />
                  </div>
                  <span className="text-xs text-gray-500">*Valor do Resgate deve ser o menor</span>
                </div>

              </div>
            </div>

            <div className="relative z-10">
              <h2 className="text-lg font-bold text-background-secondary mb-4">Inventário e Localização</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm text-background-secondary/80 font-medium">Localização de Retirada</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center">📍</span>
                    <input 
                      type="text" 
                      name="localizacao" 
                      required 
                      value={formData.localizacao} 
                      onChange={handleChange}
                      placeholder="Ex: Rua das Flores, 123 - Centro"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] focus:ring-2 focus:ring-[#D9774A] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm text-background-secondary/80 font-medium">Quantidade à Venda</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center">📦</span>
                    <input 
                      type="number" min="1" name="quantidade" required value={formData.quantidade} onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] focus:ring-2 focus:ring-[#D9774A] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

              </div>
            </div>

            <div className="relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2 md:col-span-1">
                  <label className="text-sm text-background-secondary/80 font-medium">Tempo de Oferta</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">⏱️</span>
                    
                    <input 
                      type="number" 
                      min="1" 
                      name="validade" 
                      required 
                      value={formData.validade} 
                      onChange={handleChange}
                      placeholder="Ex: 3"
                      className="w-full pl-10 pr-16 py-3 rounded-xl border border-gray-200 bg-[#FFF3E0] font-medium text-[#E65100] shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] focus:ring-2 focus:ring-[#D9774A] outline-none transition-all"
                    />
                    
                    <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#E65100] font-bold text-sm">
                      Horas
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 pt-6 border-t border-gray-100 relative z-10">
              
              <label className="flex items-start gap-3 cursor-pointer group">
                <input 
                  type="checkbox" name="termosAceitos" checked={formData.termosAceitos} onChange={handleChange}
                  className="w-5 h-5 mt-0.5 rounded border-gray-300 text-[#D9774A] focus:ring-[#D9774A] cursor-pointer"
                />
                <span className="text-sm text-background-secondary font-medium leading-relaxed">
                  Li e concordo com os{" "}
                  <a 
                    href="/documentos/termos-contrato.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()} 
                    className="text-[#D9774A] font-bold underline decoration-[#D9774A]/30 hover:decoration-[#D9774A] underline-offset-2 transition-all"
                  >
                    Termos de Uso e o Contrato de Serviço
                  </a>
                  {" "}da Plataforma Salgado Salvo.
                </span>
              </label>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full bg-[#D9774A] hover:bg-[#c4683e] text-white font-bold text-lg py-4 rounded-xl shadow-[0_4px_14px_0_rgba(217,119,74,0.39)] hover:shadow-[0_6px_20px_rgba(217,119,74,0.23)] hover:bg-[rgba(217,119,74,0.9)] transform hover:-translate-y-0.5 transition-all duration-200
                ${isSubmitting 
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed" // Estilo bloqueado
                    : "bg-[#D9774A] hover:bg-[#c4683e] text-white hover:shadow-[0_6px_20px_rgba(217,119,74,0.23)] hover:bg-[rgba(217,119,74,0.9)] transform hover:-translate-y-0.5" 
                  }
                `}
              >
                PUBLICAR NOVO RESGATE 🚀
              </button>
            </div>

          </form>
        </Container>
      </main>
    </div>
  );
}