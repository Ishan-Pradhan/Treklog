"use client";

import {
  ClockAfternoonIcon,
  MapTrifoldIcon,
  PulseIcon,
} from "@phosphor-icons/react";

type DashboardCardPropType = {
  title: string;
  content: number;
  contentUnit?: string;
  color: string;
};

import { formatNumber } from "../_lib/utils";

function DashboardCard({
  title,
  content,
  contentUnit,
  color,
}: DashboardCardPropType) {

  const displayContent = typeof content === "number" ? formatNumber(content) : content;

  return (
    <div className="flex justify-between items-center gap-4 bg-white shadow-md p-4 px-6 xl:px-8 rounded-xl border-2 border-gray-200 overflow-hidden">
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <span className="text-stone-500 truncate">{title}</span>
        <div className="flex gap-2 items-baseline flex-nowrap min-w-0">
          <span 
            title={typeof content === 'number' ? content.toLocaleString() : String(content)} 
            className="text-stone-900 text-3xl xl:text-4xl font-bold truncate min-w-0 shrink"
          >
            {displayContent}
          </span>
          <span className="text-stone-600 text-sm sm:text-base xl:text-lg font-semibold shrink-0 whitespace-nowrap">
            {contentUnit}
          </span>
        </div>
      </div>
      <div
        className={`p-3 shrink-0 ${
          title === "Treks Completed"
            ? "bg-blue-50 text-blue-500"
            : title === "Total Distance"
            ? "bg-green-50 text-green-500"
            : "bg-orange-50 text-orange-500"
        } rounded-lg text-2xl`}
      >
        {title === "Treks Completed" ? (
          <MapTrifoldIcon />
        ) : title === "Total Distance" ? (
          <PulseIcon />
        ) : (
          <ClockAfternoonIcon />
        )}
      </div>
    </div>
  );
}

export default DashboardCard;
