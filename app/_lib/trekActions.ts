import { createClient } from "./server";
import { trekSchemaType } from "../_schema/TrekSchema";

export async function getTreks(): Promise<trekSchemaType[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("treks")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching treks:", error);
    return [];
  }

  return data || [];
}

export async function getTrekById(
  id: string | number,
): Promise<trekSchemaType | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("treks")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching trek ${id}:`, error);
    return null;
  }

  return data;
}
