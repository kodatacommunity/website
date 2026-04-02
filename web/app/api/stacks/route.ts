import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("stacks")
    .select("nom")
    .order("nom");

  if (error) {
    return NextResponse.json({ error: "Erreur lors du chargement." }, { status: 500 });
  }

  return NextResponse.json(data.map((s) => s.nom));
}
