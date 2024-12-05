import { useState } from "react";
import {
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

const GooglemapsID = import.meta.env.VITE_GOOGLE_MAP_ID;

const Googlemaps = () => {
  const [open, setOpen] = useState(false);

  const position = { lat: 55.9903, lng: 13.5958 };

  return (
    <div style={{ height: "100vh" }}>
      <Map defaultZoom={9} defaultCenter={position} mapId={GooglemapsID}>
        <AdvancedMarker position={position} onClick={() => setOpen(true)}>
          <Pin background={"purple"} />
        </AdvancedMarker>

        {open && (
          <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
            {" "}
            <p>hej där :D</p>
          </InfoWindow>
        )}
      </Map>
    </div>
  );
};

export default Googlemaps;
