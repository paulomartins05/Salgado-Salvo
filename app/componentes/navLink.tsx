"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void; 
}

export default function NavLink({ href, children, onClick }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href} 
      onClick={onClick} 
      className={cn(
        "font-inter text-sm md:text-base font-medium transition-all duration-200",
        isActive 
          ? "text-laranja-destaque cursor-default" 
          : "text-black hover:text-laranja-destaque hover:opacity-70"
      )}
    >
      {children}
    </Link>
  );
}