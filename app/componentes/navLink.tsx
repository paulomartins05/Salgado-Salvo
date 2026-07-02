"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href} 
      className={cn(
        "font-lora text-xs md:text-sm font-medium transition-all duration-200",
        isActive ? "text-laranja-destaque cursor-default" : "text-black hover:text-laranja-destaque hover:opacity-70"
      )}
    >
      {children}
    </Link>
  );
}