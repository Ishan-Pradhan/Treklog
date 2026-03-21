"use client";

import { TrashIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteTrekButton({ id }: { id: string | number }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this trek?"
    );
    if (!confirmation) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/treks/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete trek");
      }

      alert("Trek deleted successfully!");
      router.push("/list-treks");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to delete trek.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`text-red-500 hover:text-red-700 transition-colors ${
        isDeleting ? "opacity-50 cursor-not-allowed" : ""
      }`}
      aria-label="Delete trek"
    >
      <TrashIcon size={24} />
    </button>
  );
}
