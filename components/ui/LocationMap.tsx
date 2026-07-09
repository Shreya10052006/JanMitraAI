"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Crosshair, Loader2 } from "lucide-react";

// Leaflet's default marker icon paths break under webpack bundling — point
// them at the CDN instead of trying to wire up local asset imports.
const DEFAULT_ICON = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export interface MapMarker {
  lat: number;
  lng: number;
  label?: string;
  color?: string;
}

interface LocationMapProps {
  /** [lat, lng] center of the map. */
  center: [number, number];
  zoom?: number;
  /** Markers to render (e.g. complaint pin, nearby issues). */
  markers?: MapMarker[];
  /** If provided, clicking the map calls this with the clicked lat/lng and drops a pin there. */
  onLocationSelect?: (lat: number, lng: number) => void;
  /** Show a "Locate Me" floating button that centers on the browser's geolocation. */
  showLocateButton?: boolean;
  heightClassName?: string;
  className?: string;
}

function ClickHandler({ onSelect }: { onSelect: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function RecenterOnChange({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom(), { animate: true });
  }, [center, map]);
  return null;
}

function LocateButton({ onLocate }: { onLocate: (lat: number, lng: number) => void }) {
  const map = useMap();
  const [locating, setLocating] = useState(false);

  function handleClick() {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        map.setView([latitude, longitude], 15, { animate: true });
        onLocate(latitude, longitude);
        setLocating(false);
      },
      () => setLocating(false),
      { timeout: 8000 }
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={locating}
      className="absolute bottom-3 right-3 z-[1000] w-10 h-10 rounded-xl bg-white shadow-lg border border-[#E8E4F8] flex items-center justify-center text-[#6B3FFF] hover:bg-[#F9F8FF] transition-colors disabled:opacity-60"
      aria-label="Locate me"
      title="Locate me"
    >
      {locating ? <Loader2 size={17} className="animate-spin" aria-hidden="true" /> : <Crosshair size={17} aria-hidden="true" />}
    </button>
  );
}

export function LocationMap({
  center,
  zoom = 14,
  markers = [],
  onLocationSelect,
  showLocateButton = false,
  heightClassName = "h-56",
  className = "",
}: LocationMapProps) {
  // MapContainer only reads its `center` prop on first mount, so capture the
  // starting location once via a lazy initializer rather than a ref read
  // during render (later `center` changes are applied by RecenterOnChange).
  const [initialCenter] = useState(center);

  return (
    <div className={`relative rounded-xl overflow-hidden border border-[#E8E4F8] ${heightClassName} ${className}`}>
      <MapContainer
        center={initialCenter}
        zoom={zoom}
        scrollWheelZoom
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RecenterOnChange center={center} />
        {onLocationSelect && <ClickHandler onSelect={onLocationSelect} />}
        {markers.map((m, i) => (
          <Marker key={i} position={[m.lat, m.lng]} icon={DEFAULT_ICON}>
            {m.label && <Popup>{m.label}</Popup>}
          </Marker>
        ))}
        {showLocateButton && onLocationSelect && <LocateButton onLocate={onLocationSelect} />}
      </MapContainer>
    </div>
  );
}
