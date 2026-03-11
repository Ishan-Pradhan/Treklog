import { createClient } from "@/app/_lib/client";

const supabase = createClient();
export async function GET() {
  const { data, error } = await supabase.from("treks").select("*");
  if (error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
