"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { MagnifyingGlassIcon, ArrowsDownUpIcon } from "@phosphor-icons/react";
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
import { trekSchemaType } from "../_schema/TrekSchema";
import { Difficulty } from "../_types/TrekTypes";

export default function TrekListClient({ treks }: { treks: trekSchemaType[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  const filteredAndSortedTreks = useMemo(() => {
    let result = [...treks];

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.trek_destination.toLowerCase().includes(q) ||
          t.region.toLowerCase().includes(q)
      );
    }

    // Filter by Region
    if (selectedRegion && selectedRegion !== "all") {
      result = result.filter((t) => t.region === selectedRegion);
    }

    // Filter by Difficulty
    if (selectedDifficulty && selectedDifficulty !== "all") {
      result = result.filter((t) => t.difficulty === selectedDifficulty);
    }

    // Sort by date
    result.sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;

      if (sortOrder === "desc") {
        return dateB - dateA; // Newest first
      } else {
        return dateA - dateB; // Oldest first
      }
    });

    return result;
  }, [treks, searchQuery, selectedRegion, selectedDifficulty, sortOrder]);

  return (
    <>
      {/* Page search and filters */}
      <div className="bg-white border-2 border-gray-100 p-5 rounded-xl shadow-md mt-4 grid grid-cols-6 gap-4">
        <div className="border border-gray-200 focus-within:border focus-within:border-primary-500 flex gap-2 items-center text-stone-700 bg-stone-50 col-span-3 rounded-md">
          <label htmlFor="search" className="text-xl text-stone-500 pl-4">
            <MagnifyingGlassIcon />
          </label>
          <input
            id="search"
            type="text"
            className="focus:outline-none placeholder:text-stone-300 w-full pl-2 pr-4 py-2 bg-transparent"
            placeholder="Search Treks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-span-1">
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-full bg-stone-50 py-5">
              <SelectValue placeholder="All Regions" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select Region</SelectLabel>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="Annapurna">Annapurna</SelectItem>
                <SelectItem value="Langtang">Langtang</SelectItem>
                <SelectItem value="Kathmandu">Kathmandu</SelectItem>
                <SelectItem value="Manang">Manang</SelectItem>
                <SelectItem value="Mustang">Mustang</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-1 w-full">
          <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
            <SelectTrigger className="w-full bg-stone-50 py-5">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Difficulty</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Moderate">Moderate</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-1">
          <button 
            onClick={() => setSortOrder(prev => prev === "desc" ? "asc" : "desc")}
            className="bg-stone-50 flex gap-2 justify-center items-center w-full h-full rounded-md border border-gray-200 px-4 hover:bg-stone-100 transition-colors text-stone-500"
          >
            <ArrowsDownUpIcon size={20} />
            <span className="text-sm">Date ({sortOrder === "desc" ? "New" : "Old"})</span>
          </button>
        </div>
      </div>

      {/* Trek lists */}
      <div className="flex flex-col gap-4 mt-5">
        {filteredAndSortedTreks.length > 0 ? (
          filteredAndSortedTreks.map((trek) => (
            <Link href={`/list-treks/${trek.id}`} key={trek.id}>
              <TrekListCard
                time_unit={trek.time_unit}
                trek_destination={trek.trek_destination}
                time_taken={trek.time_taken}
                distance={trek.distance}
                date={trek.date}
                region={trek.region}
                difficulty={trek.difficulty as Difficulty}
              />
            </Link>
          ))
        ) : (
          <div className="text-center py-10 text-stone-500">
            No treks found matching your filters.
          </div>
        )}
      </div>
    </>
  );
}
