import { createClient } from "@/app/_lib/server";
import { trekSchemaType } from "@/app/_schema/TrekSchema";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body: trekSchemaType = await req.json();

  console.log("Updating trek id:", id);
  console.log("Body:", body);
  
  const supabase = await createClient();
  const { error } = await supabase
    .from("treks")
    .update(body)
    .eq("id", Number(id));

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath("/");
  revalidatePath("/list-treks");
  revalidatePath(`/list-treks/${id}`);

  return NextResponse.json({ message: "Updated successfully" });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  console.log("Deleting trek id:", id);
  
  const supabase = await createClient();
  const { error } = await supabase
    .from("treks")
    .delete()
    .eq("id", Number(id));

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath("/");
  revalidatePath("/list-treks");

  return NextResponse.json({ message: "Deleted successfully" });
}
