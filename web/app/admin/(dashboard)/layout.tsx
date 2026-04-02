import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { logout } from "../actions";

const NAV = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/board", label: "Board" },
  { href: "/admin/projets", label: "Projets" },
  { href: "/admin/evenements", label: "Événements" },
  { href: "/admin/membres", label: "Membres" },
  { href: "/admin/partenaires", label: "Partenaires" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-[#efeadd]">
      {/* Top bar */}
      <header className="bg-[#2d3235] border-b-2 border-[#2d3235] sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-6">
            <span className="text-white font-black uppercase tracking-tight text-lg">
              Kodata <span className="text-[#1d8f6d]">Admin</span>
            </span>
            <nav className="hidden md:flex items-center gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[#efeadd] text-sm font-bold uppercase px-3 py-1.5 hover:bg-[#1d8f6d] hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#5a5f63] text-xs hidden sm:block">
              {user.email}
            </span>
            <form action={logout}>
              <button
                type="submit"
                className="text-xs font-bold uppercase bg-[#c24b46] text-white px-3 py-1.5 border border-[#c24b46] hover:bg-[#a33a35] transition-colors"
              >
                Déconnexion
              </button>
            </form>
          </div>
        </div>

        {/* Mobile nav */}
        <nav className="md:hidden flex overflow-x-auto gap-1 px-4 pb-2">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[#efeadd] text-xs font-bold uppercase px-3 py-1.5 whitespace-nowrap hover:bg-[#1d8f6d] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="p-6">{children}</main>
    </div>
  );
}
