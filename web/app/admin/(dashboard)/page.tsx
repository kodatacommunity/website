import { createAdminClient } from "@/lib/supabase/admin";
import Link from "next/link";

const SECTIONS = [
  { href: "/admin/board", label: "Board", table: "board_members", color: "bg-[#1d8f6d]" },
  { href: "/admin/projets", label: "Projets", table: "projets", color: "bg-[#e8b056]" },
  { href: "/admin/evenements", label: "Événements", table: "evenements", color: "bg-[#d67035]" },
  { href: "/admin/membres", label: "Membres", table: "membres", color: "bg-[#c24b46]" },
  { href: "/admin/partenaires", label: "Partenaires", table: "partenaires", color: "bg-[#2d3235]" },
];

export default async function AdminDashboard() {
  const supabase = createAdminClient();

  const counts = await Promise.all(
    SECTIONS.map(async (s) => {
      const { count } = await supabase
        .from(s.table)
        .select("*", { count: "exact", head: true });
      return { ...s, count: count ?? 0 };
    })
  );

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-black text-[#2d3235] uppercase mb-2">
        Dashboard
      </h1>
      <p className="text-[#5a5f63] mb-8">
        Gérez le contenu du site Kodata.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {counts.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="border-2 border-[#2d3235] bg-white shadow-[4px_4px_0px_#2d3235] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all p-6 block"
          >
            <div
              className={`inline-block ${s.color} text-white text-xs font-black uppercase px-2 py-0.5 mb-3`}
            >
              {s.label}
            </div>
            <div className="text-4xl font-black text-[#2d3235]">{s.count}</div>
            <div className="text-sm text-[#5a5f63] mt-1">entrées</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
