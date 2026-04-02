import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { prenom, nom, email, ville, profession, niveau, motivation, stacks, photo_url, linkedin, facebook } = body;

  if (!prenom || !nom || !email) {
    return NextResponse.json({ error: "Champs obligatoires manquants." }, { status: 400 });
  }

  const supabase = createAdminClient();
  const stacksArray: string[] = Array.isArray(stacks) ? stacks : [];

  // Insérer les nouvelles stacks automatiquement (upsert, ignore si existe déjà)
  if (stacksArray.length > 0) {
    const { error: stacksError } = await supabase
      .from("stacks")
      .upsert(
        stacksArray.map((nom) => ({ nom })),
        { onConflict: "nom", ignoreDuplicates: true }
      );
    if (stacksError) {
      console.error("Supabase stacks upsert error:", stacksError);
    }
  }

  const { error } = await supabase.from("candidatures").insert({
    prenom,
    nom,
    email,
    ville: ville || null,
    profession: profession || null,
    niveau: niveau || null,
    motivation: motivation || null,
    stacks: stacksArray,
    photo_url: photo_url || null,
    linkedin: linkedin || null,
    facebook: facebook || null,
  });

  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json({ error: "Erreur lors de l'enregistrement." }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
