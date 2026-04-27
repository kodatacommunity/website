import { requireAuth } from "@/lib/supabase/check-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { errorResponse } = await requireAuth();
  if (errorResponse) return errorResponse;

  const { id } = await params;
  const body = await req.json();
  const { statut } = body;

  const allowed = ["en_attente", "contacte", "refuse"];
  if (!allowed.includes(statut)) {
    return NextResponse.json({ error: "Statut invalide." }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("dataskills_demandes_intervention")
    .update({ statut })
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
