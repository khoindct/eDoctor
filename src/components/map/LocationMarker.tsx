import { MdLocalHospital } from "react-icons/md";
import "./LocationMarker.scss";

interface Marker {
  lat: number;
  lng: number;
  onClick?: () => void;
}

const LocationMarker: React.FC<Marker> = ({ lat, lng }) => {
  return (
    <div className="location-marker">
      {" "}
      <MdLocalHospital className="custom-marker-color text-3xl" />{" "}
    </div>
  );
};

export default LocationMarker;
