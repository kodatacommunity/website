import { createClient } from "@/lib/supabase/server";
import AnnuaireClient from "./AnnuaireClient";

export default async function AnnuairePage() {
  const supabase = await createClient();
  const { data } = await supabase.from("membres").select("*").order("created_at");
  return <AnnuaireClient membres={data ?? []} />;
}
