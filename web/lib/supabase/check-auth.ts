import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function requireAuth() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      user: null,
      errorResponse: NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      ),
    };
  }

  return { user, errorResponse: null };
}
