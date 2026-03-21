import Map from "@/app/_components/MapWrapper";
import {
  CalendarIcon,
  CircleIcon,
  ClockIcon,
  MapPinIcon,
  PenIcon,
  TrendUpIcon,
} from "@phosphor-icons/react/ssr";
import { format } from "date-fns";
import Link from "next/link";
import { getTrekById } from "@/app/_lib/trekActions";
import { notFound } from "next/navigation";
import DeleteTrekButton from "@/app/_components/DeleteTrekButton";

async function TrekPreview({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const trek = await getTrekById(id);

  if (!trek) {
    return notFound();
  }

  return (
    <div className="container my-10 flex flex-col">
      <div className="flex justify-end items-center gap-4">
        <Link href={`/list-treks/${id}/edit`} className="text-stone-500 hover:text-stone-900 transition-colors">
          <PenIcon size={24} />
        </Link>
        <DeleteTrekButton id={id} />
      </div>
      <div className="flex flex-col max-w-4xl mx-auto rounded-3xl overflow-hidden bg-white pb-8 shadow-md">
        <div className="relative ">
          {trek?.latitude && trek?.longitude && (
            <Map
              position={{
                lat: trek?.latitude as number,
                lng: trek?.longitude as number,
              }}
              mode="view"
            />
          )}
          <div className="absolute bottom-0 left-0 p-10 z-50 bg-linear-to-b from-black/0  to-black/70 w-full">
            <h2 className="text-3xl font-bold text-white">
              {trek?.trek_destination}
            </h2>
            <div className="text-lg flex gap-1 items-center text-white">
              {" "}
              <MapPinIcon size={22} weight="duotone" />
              {trek?.region}
            </div>
          </div>
        </div>
        <div className="flex flex-col p-10">
          <div className="grid grid-cols-3 bg-stone-50 border border-gray-100 rounded-2xl items-center justify-center p-5">
            <div className="flex flex-col gap-2 items-center border-r border-gray-300">
              <TrendUpIcon size={28} fill="green" />
              <div className="flex gap-1 items-center">
                <span className="font-semibold text-xl text-stone-900 ">
                  {trek?.distance}{" "}
                </span>
                <span className="text-base text-stone-500">km</span>
              </div>
              <span className="uppercase text-stone-500 font-medium">
                distance
              </span>
            </div>
            <div className="flex flex-col gap-2 items-center border-r border-gray-300">
              <ClockIcon size={28} fill="orange" />
              <div className="flex gap-1 items-center">
                <span className="font-semibold text-xl text-stone-900">
                  {trek?.time_taken}{" "}
                </span>
                <span className="font-semibold text-xl text-stone-900">
                  {trek?.time_unit}
                </span>
              </div>
              <span className="uppercase text-stone-500 font-medium">
                duration
              </span>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <CircleIcon
                weight="fill"
                size={28}
                fill={
                  trek?.difficulty === "Easy"
                    ? "green"
                    : trek?.difficulty === "Moderate"
                      ? "orange"
                      : "red"
                }
              />
              <div className="flex gap-1 items-center">
                <span className="font-semibold text-xl text-stone-900">
                  {trek?.difficulty}{" "}
                </span>
              </div>
              <span className="uppercase text-stone-500 font-medium">
                difficulty{" "}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 px-10">
          <div className="flex items-center gap-3">
            <CalendarIcon size={24} weight="duotone" fill="gray" />
            <div className="flex gap-2 items-center text-lg">
              <span className=" text-stone-500">Completed on</span>
              <span>
                {" "}
                {trek?.date ? format(new Date(trek.date), "PPP") : "-"}
              </span>
            </div>
          </div>
          <p className="text-stone-600 text-lg">{trek?.description}</p>
        </div>
      </div>
    </div>
  );
}

export default TrekPreview;
