"use client";

import {
  MapContainer,
  Marker,
  TileLayer,
  LayersControl,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { LatLngLiteral } from "leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

function FlyToPosition({ position }: { position: LatLngLiteral }) {
  const map = useMap();

  // center once when position is provided
  useEffect(() => {
    map.setView(position, map.getZoom(), { animate: true });
  }, [position, map]);

  return null;
}

function MapClickHandler({
  enabled,
  onClick,
}: {
  enabled: boolean;
  onClick: (lat: number, lng: number) => void;
}) {
  useMapEvents(
    enabled
      ? {
          click(e) {
            onClick(e.latlng.lat, e.latlng.lng);
          },
        }
      : {}
  );
  return null;
}

function Map({
  position,
  setPosition,
  mode = "create",
}: {
  position: LatLngLiteral | null;
  setPosition?: (pos: LatLngLiteral) => void;
  mode?: "create" | "view";
}) {
  return (
    <MapContainer
      center={position ?? [27.7103, 85.3222]}
      zoom={13}
      scrollWheelZoom
      className="h-[50lvh] z-10"
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer name="Topographic">
          <TileLayer
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            attribution="© OpenTopoMap"
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer checked name="Normal">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap"
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="satellite">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="© Esri"
          />
        </LayersControl.BaseLayer>
      </LayersControl>

      {position && (
        <>
          <Marker position={position} />
          <FlyToPosition position={position} />
        </>
      )}

      <MapClickHandler
        enabled={mode === "create"}
        onClick={(lat, lng) => {
          setPosition?.({ lat, lng });
        }}
      />
    </MapContainer>
  );
}

export default Map;
