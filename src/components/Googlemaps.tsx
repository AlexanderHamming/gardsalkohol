import { useState } from "react";
import {
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  APIProvider
} from "@vis.gl/react-google-maps";
import { Vendor } from "@/types/vendors";

const GooglemapsID = import.meta.env.VITE_GOOGLE_MAP_ID;
const GooglemapsAPIKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

interface GooglemapsPropps {
  regionCoordinates: { lat: number; lng: number };
  vendors: Vendor[];
}

const Googlemaps: React.FC<GooglemapsPropps> = ({
  regionCoordinates,
  vendors,
}) => {
  const [open, setOpen] = useState<string | null>(null);

  if (!regionCoordinates) {
    return;
  }

  return (
    <APIProvider apiKey={GooglemapsAPIKey}>
    <div className="googlemapsComponent" style={{ height: "70vh",  }}>
      <Map
        defaultZoom={7.5}
        defaultCenter={regionCoordinates}
        mapId={GooglemapsID}
      >
        {vendors.map((vendor) => (
          <AdvancedMarker
            key={vendor.id}
            position={vendor.adressLocation}
            onClick={() => setOpen(vendor.id)}
          >
            <Pin background={"red"} />
            {open === vendor.id && (
              <InfoWindow
                position={vendor.adressLocation}
                onCloseClick={() => setOpen(null)}
              >
                <div>
                  <h3>{vendor.name}</h3>
                  <p>{vendor.description}</p>
                </div>
              </InfoWindow>
            )}
          </AdvancedMarker>
        ))}
      </Map>
    </div>
    </APIProvider>
  );
};

export default Googlemaps;
