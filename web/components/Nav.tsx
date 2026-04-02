"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/board", label: "Le Board" },
  { href: "/projets", label: "Projets" },
  { href: "/evenements", label: "Événements" },
  { href: "/annuaire", label: "Annuaire" },
  { href: "/partenaires", label: "Partenaires" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full max-w-7xl mx-auto px-6 py-5 flex justify-between items-center z-50 relative">
      {/* Logo */}
      <Link href="/" className="hover:opacity-80 transition-opacity">
        <Image
          src="/logo_kodata.svg"
          alt="Kodata:"
          width={180}
          height={48}
          priority
        />
      </Link>

      {/* Desktop nav */}
      <div className="hidden lg:flex gap-7 text-base font-medium items-center">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`hover:text-[#1d8f6d] transition-colors underline-offset-4 decoration-2 ${
              pathname === l.href
                ? "text-[#1d8f6d] underline"
                : "hover:underline"
            }`}
          >
            {l.label}
          </Link>
        ))}
        <Link
          href="/rejoindre"
          className="bg-[#2d3235] text-[#efeadd] px-5 py-2 border-2 border-[#2d3235] retro-shadow-hover font-semibold"
        >
          Rejoindre
        </Link>
      </div>

      {/* Mobile burger */}
      <button
        className="lg:hidden border-2 border-[#2d3235] p-2"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-[#efeadd] border-y-2 border-[#2d3235] px-6 py-4 flex flex-col gap-4 z-50">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`text-lg font-medium ${
                pathname === l.href ? "text-[#1d8f6d]" : ""
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/rejoindre"
            onClick={() => setOpen(false)}
            className="bg-[#2d3235] text-[#efeadd] px-5 py-3 text-center border-2 border-[#2d3235] font-semibold"
          >
            Rejoindre
          </Link>
        </div>
      )}
    </nav>
  );
}
