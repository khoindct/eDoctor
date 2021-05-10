import LocationOnIcon from "@material-ui/icons/LocationOn";
import "./LocationMarker.scss";

interface Marker {
  lat: number;
  lng: number;
  onClick?: () => void;
}

const LocationMarker: React.FC<Marker> = ({ lat, lng }) => {
  return (
    <i className="location-marker">
      {" "}
      <LocationOnIcon className="custom-marker-color" />{" "}
    </i>
  );
};

export default LocationMarker;
