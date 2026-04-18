import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");

  const supabase = await createClient();

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  } else if (token_hash && type) {
    await supabase.auth.verifyOtp({
      token_hash,
      type: type as "recovery" | "email" | "signup" | "invite" | "magiclink" | "email_change",
    });
  }

  if (type === "recovery") {
    return NextResponse.redirect(new URL("/admin/reset-password", request.url));
  }

  return NextResponse.redirect(new URL("/admin", request.url));
}
