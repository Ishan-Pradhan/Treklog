import {
  CircleIcon,
  ClockClockwiseIcon,
  TrendUpIcon,
} from "@phosphor-icons/react/ssr";
import { TrekTypes } from "../_types/TrekTypes";
import { format } from "date-fns";

function TrekCard({
  trek_destination,
  region,
  date,
  distance,
  time_taken,
  time_unit,
  difficulty,
}: TrekTypes) {
  return (
    <div className="flex flex-col gap-4 w-full  bg-white shadow-md px-6 py-3 rounded-xl border border-gray-100  items-start">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between items-center w-full">
          <span className="text-xl text-stone-900 font-semibold flex-1">
            {trek_destination}
          </span>
          <span
            className={`px-3  py-1 rounded-full text-sm ${
              difficulty === "Easy"
                ? "bg-green-50 text-green-700"
                : difficulty === "Moderate"
                ? "bg-amber-50 text-amber-700"
                : "bg-red-50 text-red-700"
            } `}
          >
            {difficulty}
          </span>
        </div>
        <div className="flex gap-2 items-center text-stone-500 text-sm font-medium">
          <span className="">{region}</span>
          <CircleIcon weight="fill" size={6} />
          <span className="flex-1">
            {" "}
            {date ? format(new Date(date), "PPP") : "-"}
          </span>
        </div>
      </div>

      <div className="flex gap-4 items-center text-stone-500 text-md font-light">
        <div className="flex gap-2 items-center">
          <TrendUpIcon className="text-primary-500" />
          <span>{distance} km</span>
        </div>
        <div className="flex gap-2 items-center">
          <ClockClockwiseIcon className="text-primary-500" />
          <span>
            {time_taken} {time_unit}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TrekCard;
