"use client"

import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import Button from "./button"

export default function BotaoLogout() {
  const router = useRouter()

  const handleSair = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh()
        }
    }});
  }
  return (
      <Button 
        onClick={handleSair} 
        variant="outline" 
        className="w-full md:w-auto border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600 font-bold"
      >
        SAIR DA CONTA
      </Button>
    );
}
