import Link from "next/link";
import Button from "../_components/Button";
import { PlusIcon } from "@phosphor-icons/react/ssr";
import TrekListClient from "./TrekListClient";
import { getTreks } from "../_lib/trekActions";

export default async function ListTreks() {
  const treks = await getTreks();
  const totalTreks = treks.length;

  return (
    <div className="flex flex-col container my-10">
      {/* Page headings */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1 ">
          <h2 className="text-3xl text-stone-900 font-semibold">My Treks</h2>
          <p className="text-stone-500 text-md">
            {totalTreks} Adventures Recorded
          </p>
        </div>

        <Link href={"/add-new-trek"}>
          <Button Icon={PlusIcon}>Add New Trek</Button>
        </Link>
      </div>

      <TrekListClient treks={treks} />
    </div>
  );
}
