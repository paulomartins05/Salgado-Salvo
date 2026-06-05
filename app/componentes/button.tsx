import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../lib/utils";


export const buttonVarians = cva(`
  rounded-2xl font-bold transition-colors shadow-md cursor-pointer
 
  `, {
    variants: {
      variant: {
        primary:  "bg-laranja-destaque",
        secondary: "bg-purple-500"
      },
      size: {
        sm: "p-1",
        md: "p-3"
      }
    },
    defaultVariants: {
      variant: "secondary",
      size: "sm",
    }
  }
);

interface ButtonProps extends VariantProps<typeof buttonVarians>,
Omit<React.ComponentProps<"button">, "size"> {}

export default function Button({
  size,
  variant,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button type="submit" className={cn(buttonVarians({variant:"primary", size}))} {...props}> 
      {children}
    </button>
  )
}