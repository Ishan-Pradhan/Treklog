import { getTreks } from "../../_lib/trekActions";

export async function GET() {
  try {
    const treks = await getTreks();
    return new Response(JSON.stringify(treks), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
