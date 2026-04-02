import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAuth } from "@/lib/supabase/check-auth";

export async function GET() {
  const { errorResponse } = await requireAuth();
  if (errorResponse) return errorResponse;

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("candidatures")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
