import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAuth } from "@/lib/supabase/check-auth";

export async function GET() {
  const { errorResponse } = await requireAuth();
  if (errorResponse) return errorResponse;

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("partenaires")
    .select("*")
    .order("ordre");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  const { errorResponse } = await requireAuth();
  if (errorResponse) return errorResponse;

  const body = await request.json();
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("partenaires")
    .insert(body)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data }, { status: 201 });
}
