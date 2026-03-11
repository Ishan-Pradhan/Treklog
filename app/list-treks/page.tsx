import Link from "next/link";
import Button from "../_components/Button";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  ArrowsDownUpIcon,
} from "@phosphor-icons/react/ssr";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../_components/ui/select";

import TrekListCard from "../_components/TrekListCard";
import { Difficulty } from "../_types/TrekTypes";
import { trekSchemaType } from "../_schema/TrekSchema";
import { getTreks } from "../_lib/trekActions";

async function ListTreks() {
  const treks = await getTreks();
  const totalTreks = treks.length;

  return (
    <div className="flex flex-col container my-10">
      {/* Page headings */}
      <div className="flex justify-between items-center">
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

      {/* Page search and filters */}
      <div className="bg-white border-2 border-gray-100 p-5 rounded-xl shadow-md mt-4 grid grid-cols-6 gap-4">
        <div className="border border-gray-200 focus-within:border focus-within:border-primary-500 flex gap-2 items-center text-stone-700 bg-stone-50 col-span-3  rounded-md">
          <label htmlFor="search" className="text-xl text-stone-500 pl-4">
            <MagnifyingGlassIcon />
          </label>
          <input
            id="search"
            type="text"
            className="focus:outline-none placeholder:text-stone-300 w-full pl-2 pr-4 py-2"
            placeholder="Search Treks..."
          />
        </div>
        <div className="col-span-1">
          <Select>
            <SelectTrigger className="w-full bg-stone-50 py-5">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select Region</SelectLabel>
                <SelectItem value="all">all</SelectItem>
                <SelectItem value="Annapurna">Annapurna</SelectItem>
                <SelectItem value="Langtang">Langtang</SelectItem>
                <SelectItem value="Kathmandu">Kathmandu</SelectItem>
                <SelectItem value="Manang">Manang</SelectItem>
                <SelectItem value="Mustang">Mustang</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-1 w-full  ">
          <Select>
            <SelectTrigger className="w-full bg-stone-50 py-5">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel> Difficulty</SelectLabel>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Moderate">Moderate</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-1">
          <button className="bg-stone-50 flex gap-2 items-center w-full h-full rounded-md border border-gray-200 px-4 text-stone-500">
            <ArrowsDownUpIcon size={20} />
            <span className="text-sm">Date</span>
          </button>
        </div>
      </div>

      {/* Trek lists */}
      <div className="flex flex-col gap-4 mt-5">
        {treks.map((trek: trekSchemaType) => {
          return (
            <Link href={`/list-treks/${trek.id}`} key={trek.id}>
              <TrekListCard
                time_unit={trek.time_unit}
                trek_destination={trek.trek_destination}
                time_taken={trek.time_taken}
                distance={trek.distance}
                date={trek.date}
                region={trek.region}
                difficulty={trek.difficulty as Difficulty}
                key={trek.id}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default ListTreks;
