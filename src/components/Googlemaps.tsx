import { useState } from "react";
import {
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { Vendor } from "@/types/vendors";

const GooglemapsID = import.meta.env.VITE_GOOGLE_MAP_ID;

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
    <div className="googlemapsComponent" style={{ height: "70vh",  }}>
      <Map
        defaultZoom={9}
        defaultCenter={regionCoordinates}
        mapId={GooglemapsID}
      >
        {vendors.map((vendor) => (
          <AdvancedMarker
            key={vendor.id}
            position={vendor.adressLocation}
            onClick={() => setOpen(vendor.id)}
          >
            <Pin background={"blue"} />
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
  );
};

export default Googlemaps;
