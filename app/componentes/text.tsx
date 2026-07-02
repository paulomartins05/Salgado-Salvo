import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../lib/utils";

export const textVariants = cva(``, {
    variants: {
      variant: {
      // H1
      playfair: "font-playfair text-4xl md:text-5xl font-bold text-salgado-laranja", 
      
      // H2 e Títulos de Seção
      lora: "font-lora text-2xl md:text-3xl font-semibold", 
      
      // Textos corridos
      inter: "font-inter text-base text-gray-800", 
      
      // Descrições pequenas (ex: validades nos cards)
      caption: "font-inter text-xs text-salgado-caqui",
      }
    },
    defaultVariants: {
      variant: "inter"
    }
  }
)

interface TextProps extends VariantProps<typeof textVariants> {
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode;
}

export default function Text({
  as = "span",
  variant,
  className, 
  children, 
  ...props
}: TextProps) {
  return (
    React.createElement(
      as,
      {
        className: cn(textVariants({ variant }), className),
        ...props
      },
      children
    )
  )


}