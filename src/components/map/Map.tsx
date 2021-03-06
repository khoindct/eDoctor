import { useState } from "react";
import "./Map.scss";
import GoogleMapReact from "google-map-react";
import LocationMarker from "./LocationMarker";

interface Location {
  lat: number;
  lng: number;
}

interface IMap {
  geometry: number[];
  address?: string;
}

const Map: React.FC<IMap> = ({ geometry, address }) => {
  const [center] = useState<Location>({
    lat: geometry[1],
    lng: geometry[0],
  });
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
        center={{ lat: geometry[1], lng: geometry[0] }}
      >
        <LocationMarker lat={geometry[1]} lng={geometry[0]} address={address} />
      </GoogleMapReact>
    </div>
  );
};

export default Map;
