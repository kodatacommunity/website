import Link from "next/link";
import Image from "next/image";

const socials = [
  {
    href: "https://www.facebook.com/profile.php?id=61587101146608",
    label: "Facebook",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
];

const nav = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/board", label: "Le Board" },
  { href: "/projets", label: "Projets" },
  { href: "/evenements", label: "Événements" },
  { href: "/partenaires", label: "Partenaires" },
];

const legal = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/confidentialite", label: "Confidentialité" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t-2 border-[#2d3235] py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-10">
        {/* Brand */}
        <div className="max-w-xs">
          <Image
            src="/logo_kodata.svg"
            alt="Kodata:"
            width={150}
            height={40}
            className="mb-3"
          />
          <p className="text-[#5a5f63] leading-relaxed">
            La culture Data avec un K:
          </p>
          <p className="text-[#5a5f63] text-sm mt-2 leading-relaxed">
            Une initiative des alumni du{" "}
            <span className="font-semibold text-[#2d3235]">YALI RLC Madagascar Chapter</span>.
          </p>
          <div className="flex gap-3 mt-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="border-2 border-[#2d3235] p-2 text-[#2d3235] hover:bg-[#2d3235] hover:text-[#efeadd] transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-12 text-sm flex-wrap">
          <div className="flex flex-col gap-3">
            <span className="font-semibold text-[#2d3235] uppercase tracking-wide text-xs">Navigation</span>
            {nav.map((l) => (
              <Link key={l.href} href={l.href} className="text-[#5a5f63] hover:text-[#1d8f6d] transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-semibold text-[#2d3235] uppercase tracking-wide text-xs">Légal</span>
            {legal.map((l) => (
              <Link key={l.href} href={l.href} className="text-[#5a5f63] hover:text-[#1d8f6d] transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-2 text-[#5a5f63] text-xs">
        <span>© {new Date().getFullYear()} Kodata: — Une initiative des alumni du RLC Madagascar Chapter</span>
        <span>
          Made with ❤️ by{" "}
          <a href="https://dts.dabil.io" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#2d3235] hover:text-[#1d8f6d] transition-colors">
            DTS
          </a>
        </span>
      </div>
    </footer>
  );
}
