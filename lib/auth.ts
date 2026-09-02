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

    sendResetPassword: async ({ user, url }) => {
      console.log("EMAIL DO USUARIO", user.email)
      console.log("URL DO RESET", url)
    }
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "CONSUMIDOR",
        input: false
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