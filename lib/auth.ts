import { betterAuth } from "better-auth";
import { prisma } from "./prisma"
import { prismaAdapter } from "better-auth/adapters/prisma";

export const auth = betterAuth({ 
  database: prismaAdapter(prisma, { 
    provider: "postgresql",  
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "CONSUMIDOR",
        input: true
      },
      telefone: {
        type: "string",
        required: false,
        input: true
      },
      cnpj: {
        type: "string",
        required: false,
        input: true
      },
      localizacao: {
        type: "string",
        required: false,
        input: true
      }
    }
  }
});