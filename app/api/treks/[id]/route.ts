import { createClient } from "@/app/_lib/client";
import { trekSchemaType } from "@/app/_schema/TrekSchema";
import { NextRequest, NextResponse } from "next/server";

// TODO Fix error: installHook.js:1 No trek found with id

const supabase = createClient();
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body: trekSchemaType = await req.json();

  console.log("Updating trek id:", id);
  console.log("Body:", body);
  const { data, error } = await supabase
    .from("treks")
    .update(body)
    .eq("id", id)
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data || data.length === 0) {
    return NextResponse.json(
      { error: `No trek found with id ${id}` },
      { status: 404 }
    );
  }

  return NextResponse.json(data[0]);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  console.log("Deleting trek id:", id);
  const { error } = await supabase
    .from("treks")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Deleted successfully" });
}
