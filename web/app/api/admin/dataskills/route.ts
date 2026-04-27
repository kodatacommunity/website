import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAuth } from "@/lib/supabase/check-auth";

export async function GET() {
  const { errorResponse } = await requireAuth();
  if (errorResponse) return errorResponse;

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("dataskills_appels")
    .select("*, dataskills_candidatures(count)")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const { errorResponse } = await requireAuth();
  if (errorResponse) return errorResponse;

  const body = await req.json();
  const { titre, description, theme, competences_recherchees, date_workshop } = body;

  if (!titre || !description) {
    return NextResponse.json({ error: "Titre et description requis." }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("dataskills_appels")
    .insert({
      titre,
      description,
      theme: theme || null,
      competences_recherchees: Array.isArray(competences_recherchees) ? competences_recherchees : [],
      date_workshop: date_workshop || null,
      statut: "ouvert",
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data }, { status: 201 });
}
