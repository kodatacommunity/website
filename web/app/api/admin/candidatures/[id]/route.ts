import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAuth } from "@/lib/supabase/check-auth";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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
      linkedin: candidature.linkedin ?? "",
      facebook: candidature.facebook ?? "",
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

    await resend.emails.send({
      from: "Kodata <noreply@kodata-community.org>",
      to: candidature.email,
      subject: "Bienvenue dans la communauté Kodata !",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#efeadd;border:2px solid #2d3235;">
          <h1 style="font-size:24px;font-weight:900;color:#2d3235;text-transform:uppercase;margin:0 0 16px;">
            Bienvenue, ${candidature.prenom} !
          </h1>
          <p style="color:#2d3235;line-height:1.6;margin:0 0 16px;">
            Nous avons le plaisir de t'informer que ta candidature a été <strong>acceptée</strong>.
            Tu fais désormais partie de la communauté <strong>Kodata</strong> — la communauté malgache de la data.
          </p>
          <p style="color:#2d3235;line-height:1.6;margin:0 0 24px;">
            Tu peux dès maintenant retrouver ton profil dans l'annuaire et suivre nos projets et événements sur le site.
          </p>
          <a href="https://kodata-community.org" style="display:inline-block;background:#1d8f6d;color:#fff;font-weight:900;text-transform:uppercase;padding:12px 24px;border:2px solid #2d3235;text-decoration:none;">
            Visiter le site
          </a>
          <p style="color:#5a5f63;font-size:13px;margin:32px 0 0;">
            L'équipe Kodata
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Action invalide." }, { status: 400 });
}
