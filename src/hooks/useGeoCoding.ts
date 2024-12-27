import { GeocodeResult } from "@/types/googleTypes";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

const useGeocode = () => {
  const geocodingApiLoaded = useMapsLibrary("geocoding");

  const geocodeAddress = async (address: string): Promise<GeocodeResult> => {
    if (!geocodingApiLoaded) {
      throw new Error("Geocoding API is not loaded.");
    }

    const geocodingService = new window.google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocodingService.geocode({ address }, (results, status) => {
        if (status === "OK" && results && results.length > 0) {
          const location = results[0].geometry.location;
          const regionComponent = results[0].address_components.find(
            (component) =>
              component.types.includes("administrative_area_level_1")
          );
          resolve({
            lat: location.lat(),
            lng: location.lng(),
            region: regionComponent?.long_name || "Unknown Region",
          });
        } else {
          reject(new Error(`Geocoding failed: ${status}`));
        }
      });
    });
  };

  return { geocodeAddress };
};

export default useGeocode;
