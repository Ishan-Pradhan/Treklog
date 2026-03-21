"use client";

import {
  ListBulletsIcon,
  MapTrifoldIcon,
  PlusCircleIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { useAuth } from "../_context/AuthContext";

function Header() {
  const path = usePathname();
  const { user } = useAuth();

  return (
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-4 md:py-5 shadow-2xs font-poppins gap-4 md:gap-0">
      <div className=" flex items-center gap-2">
        <div className="bg-primary-500 p-2 rounded-xl text-white ">
          <MapTrifoldIcon size={24} />
        </div>
        <span className="font-poppins font-semibold text-stone-950 text-xl">
          TrekLogs
        </span>
      </div>

      <ul className="flex flex-wrap justify-center md:justify-end gap-2 md:gap-6 items-center w-full md:w-auto">
        <li>
          <Link
            href={"/"}
            className={`flex items-center gap-1 px-3 py-2 rounded-md  ${
              path === "/"
                ? "bg-primary-100 text-primary-500"
                : "text-stone-700"
            }`}
          >
            <MapTrifoldIcon size={20} className="md:w-6 md:h-6" />
            <span className="text-sm md:text-base">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            href={"/list-treks"}
            className={`flex items-center gap-1 px-3 py-2 rounded-md  ${
              path === "/list-treks"
                ? "bg-primary-100 text-primary-500"
                : "text-stone-700"
            }`}
          >
            <ListBulletsIcon size={20} className="md:w-6 md:h-6" />
            <span className="text-sm md:text-base">My Treks</span>
          </Link>
        </li>
        <li>
          <Link
            href={"/add-new-trek"}
            className={`flex items-center gap-1 px-3 py-2 rounded-md  ${
              path === "/add-new-trek"
                ? "bg-primary-100 text-primary-500"
                : "text-stone-700"
            }`}
          >
            <PlusCircleIcon size={20} className="md:w-6 md:h-6" />
            <span className="text-sm md:text-base">New Trek</span>
          </Link>
        </li>
        {user && (
          <li>
            <form action="/auth/logout" method="post">
              <Button className="cursor-pointer">Logout</Button>
            </form>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Header;
