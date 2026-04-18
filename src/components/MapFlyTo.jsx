import { useEffect } from "react";
import { useMap } from "react-leaflet";

/**
 * Центрирует карту на точке при смене focus (например ?place= из URL).
 */
function MapFlyTo({ position, zoom }) {
  const map = useMap();

  useEffect(() => {
    if (!position || position.length !== 2) return;
    const [lat, lng] = position;
    if (typeof lat !== "number" || typeof lng !== "number") return;
    map.flyTo([lat, lng], zoom ?? 10, { duration: 1.2 });
  }, [map, position, zoom]);

  return null;
}

export default MapFlyTo;
