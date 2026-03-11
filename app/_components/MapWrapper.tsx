"use client";

import dynamic from "next/dynamic";
import MapLoading from "./Loading-Components/MapLoading";

const Map = dynamic(() => import("./Map"), {
  loading: () => <MapLoading />,
  ssr: false,
});

export default Map;
