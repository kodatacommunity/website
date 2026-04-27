import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAuth } from "@/lib/supabase/check-auth";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { errorResponse } = await requireAuth();
  if (errorResponse) return errorResponse;

  const { id } = await params;
  const body = await req.json();
  const { action } = body;

  const statut = action === "accepter" ? "accepte" : action === "refuser" ? "refuse" : null;
  if (!statut) {
    return NextResponse.json({ error: "Action invalide." }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("dataskills_candidatures")
    .update({ statut })
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
