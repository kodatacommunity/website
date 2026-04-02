import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAuth } from "@/lib/supabase/check-auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { errorResponse } = await requireAuth();
  if (errorResponse) return errorResponse;

  const { id } = await params;
  const { action } = await request.json();
  const supabase = createAdminClient();

  if (action === "refuser") {
    const { error } = await supabase
      .from("candidatures")
      .update({ statut: "refusee" })
      .eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  if (action === "accepter") {
    // Récupérer la candidature
    const { data: candidature, error: fetchError } = await supabase
      .from("candidatures")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !candidature) {
      return NextResponse.json({ error: "Candidature introuvable." }, { status: 404 });
    }

    // Créer le membre
    const initiales = (
      (candidature.prenom?.[0] ?? "") + (candidature.nom?.[0] ?? "")
    ).toUpperCase();

    const { error: membreError } = await supabase.from("membres").insert({
      prenom: candidature.prenom,
      nom: candidature.nom,
      initiales,
      photo_url: candidature.photo_url ?? null,
      color: "bg-[#1d8f6d]",
      langages: candidature.stacks ?? [],
      linkedin: "",
      facebook: "",
    });

    if (membreError) {
      return NextResponse.json({ error: membreError.message }, { status: 500 });
    }

    // Mettre à jour le statut
    const { error: updateError } = await supabase
      .from("candidatures")
      .update({ statut: "acceptee" })
      .eq("id", id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Action invalide." }, { status: 400 });
}
