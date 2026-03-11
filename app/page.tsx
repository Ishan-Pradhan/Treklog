// TODO move fetchtrek to another file
import { PlusIcon } from "@phosphor-icons/react/ssr";
import DashboardCard from "./_components/DashboardCard";
import Link from "next/link";
import Button from "./_components/Button";
import TrekCard from "./_components/TrekCard";
import { trekSchemaType } from "./_schema/TrekSchema";

export default async function Home() {
  const res = await fetch(`/api/treks`);
  const treks = await res.json();

  const totalTreks = treks.length;
  const totalDistance = treks.reduce(
    (acc: number, trek: trekSchemaType) => acc + trek.distance,
    0,
  );

  const totalTime = treks.reduce(
    (acc: number, trek: trekSchemaType) => acc + trek.time_taken,
    0,
  );

  return (
    <div className="flex flex-col container font-poppins">
      <div className="flex flex-col gap-2 mt-10">
        <h2 className="text-stone-950 text-3xl font-bold">
          Welcome Back, Trekker
        </h2>
        <p className="text-stone-500 text-lg ">
          Track your journeys and conquer new heights.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-8 mt-10">
        <DashboardCard
          title="Treks Completed"
          color="blue"
          content={totalTreks}
        />
        <DashboardCard
          title="Total Distance"
          color="red"
          content={totalDistance}
          contentUnit="km"
        />
        <DashboardCard
          title="Time Trekking"
          color="orange"
          content={totalTime}
          contentUnit="hrs (approx)"
        />
      </div>

      <div className="mt-15 flex flex-col">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl text-stone-950 font-poppins">
            Recent Adventures
          </h3>
          <div className="flex gap-3 items-center text-xl">
            <Link href={"/list-treks"} className="text-primary-500 text-base">
              View All
            </Link>
            <Link href={"/add-new-trek"}>
              <Button Icon={PlusIcon}>Add New</Button>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6 mt-5">
          {treks?.map((trek: trekSchemaType) => {
            return (
              <TrekCard
                time_unit={trek.time_unit}
                trek_destination={trek.trek_destination}
                time_taken={trek.time_taken}
                distance={trek.distance}
                date={trek.date}
                region={trek.region}
                difficulty={trek.difficulty}
                key={trek.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
