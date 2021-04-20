import { useEffect, useState } from 'react';
import './Map.scss';
import GoogleMapReact from 'google-map-react';
import LocationMarker from './LocationMarker';

interface Location {
  lat: number;
  lng: number;
}

const Map = () => {
  const [center] = useState<Location>({
    lat: 10.0425842,
    lng: 105.7659486,
  });
  const [currentPosition, setCurrentPosition] = useState<Location>();
  const [zoom] = useState(19);

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

  const handleApiLoaded = (map: any, maps: any) => {
    console.log(google);
  };

  return (
    // Important! Always set the container height explicitly
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: `${process.env.REACT_APP_GOOGLE_MAP_API}` }}
        defaultCenter={center}
        defaultZoom={zoom}
        center={currentPosition}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        <LocationMarker lat={center.lat} lng={center.lng} />
      </GoogleMapReact>
    </div>
  );
};

export default Map;
