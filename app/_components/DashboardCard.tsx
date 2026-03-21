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
    <div className="flex justify-between items-center bg-white shadow-md  p-4 px-8 rounded-xl border-2 border-gray-200">
      <div className="flex flex-col gap-2">
        <span className="text-stone-500">{title}</span>
        <div className="flex gap-2 items-baseline flex-wrap sm:flex-nowrap">
          <span className="text-stone-900 text-4xl font-bold truncate shrink">{displayContent}</span>
          <span className="text-stone-600 text-lg sm:text-xl font-semibold shrink-0">
            {contentUnit}
          </span>
        </div>
      </div>
      <div
        className={`p-3 ${
          title === "Treks Completed"
            ? "bg-blue-50 text-blue-500"
            : title === "Total Distance"
            ? "bg-green-50 text-green-500"
            : "bg-orange-50 text-orange-500"
        } rounded-lg  text-2xl`}
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
