import { Calendar, MapPin } from "lucide-react";
import { TrekTypes } from "../_types/TrekTypes";
import { format } from "date-fns";

function TrekListCard({
  trek_destination,
  region,
  date,
  distance,
  time_taken,
  time_unit,
  difficulty,
}: TrekTypes) {
  return (
    <div className="flex justify-between items-center bg-white px-6 py-4 rounded-md border border-gray-100 shadow-sm hover:bg-stone-100 cursor-pointer transition-colors duration-150 ease-in-out">
      <div className="flex flex-col gap-6">
        <div className="flex gap-4 items-center">
          <span className=" text-xl font-medium">{trek_destination}</span>
          <span
            className={`px-4 py-1 rounded-full text-xs ${
              difficulty === "Easy"
                ? "bg-green-50 text-green-700 border border-green-700"
                : difficulty === "Moderate"
                ? "bg-amber-50 text-amber-700 border border-amber-700"
                : "bg-red-50 text-red-700 border border-red-700"
            }`}
          >
            {difficulty}
          </span>
        </div>
        <div className="flex gap-4 items-center text-stone-500 text-base">
          <div className="flex gap-2 items-center ">
            <MapPin />
            <span>{region}</span>
          </div>
          <div className="flex gap-2 items-center">
            <Calendar />
            <span> {date ? format(new Date(date), "PPP") : "-"}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-stone-500 text-lg">DIST</span>
          <div className="flex gap-1 items-center">
            <span>{distance}</span>
            <span>km</span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-stone-500 text-lg">TIME</span>
          <div className="flex gap-1 items-center">
            <span>{time_taken}</span>
            <span>{time_unit}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrekListCard;
