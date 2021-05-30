import { useState } from "react";
import "./Map.scss";
import GoogleMapReact from "google-map-react";
import LocationMarker from "./LocationMarker";

interface Location {
  lat: number;
  lng: number;
}

interface IMap {
  geometry?: number[];
}

const Map: React.FC<IMap> = ({ geometry }) => {
  const [center] = useState<Location>({
    lat: geometry?.[1] ?? 10.0425842,
    lng: geometry?.[0] ?? 105.7659486,
  });
  console.log(center);
  const [zoom] = useState(19);

  return (
    // Important! Always set the container height explicitly
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: `${process.env.REACT_APP_GOOGLE_MAP_API}`,
        }}
        defaultCenter={center}
        defaultZoom={zoom}
        center={center}
      >
        <LocationMarker lat={center.lat} lng={center.lng} />
      </GoogleMapReact>
    </div>
  );
};

export default Map;
