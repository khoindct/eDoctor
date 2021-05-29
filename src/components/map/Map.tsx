import { useEffect, useState } from "react";
import "./Map.scss";
import GoogleMapReact from "google-map-react";
import LocationMarker from "./LocationMarker";
import { useTypedSelector } from "../../hooks/useTypedSelector";

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
  // eslint-disable-next-line
  const [currentPosition, setCurrentPosition] = useState<Location>();
  const [zoom] = useState(19);
  // eslint-disable-next-line
  const { location, coordinates } = useTypedSelector(
    (state) => state.locations
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCurrentPosition(userLocation);
      },
      () => {
        setCurrentPosition({
          lat: 10.0425842,
          lng: 105.7659486,
        });
      }
    );
  }, []);

  return (
    // Important! Always set the container height explicitly
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: `${process.env.REACT_APP_GOOGLE_MAP_API}` }}
        defaultCenter={center}
        defaultZoom={zoom}
        center={coordinates}
      >
        <LocationMarker lat={coordinates.lat} lng={coordinates.lng} />
      </GoogleMapReact>
    </div>
  );
};

export default Map;
