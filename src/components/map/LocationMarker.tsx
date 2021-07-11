import LocationOnIcon from "@material-ui/icons/LocationOn";
import Tooltip from "@material-ui/core/Tooltip";
import "./LocationMarker.scss";

interface Marker {
  lat: number;
  lng: number;
  address?: string;
  onClick?: () => void;
}

interface IAddressToolTip {
  address: string;
}

const AddressToolTip: React.FC<IAddressToolTip> = ({ address }) => {
  return <div className="custom-tooltip">{address}</div>;
};

const LocationMarker: React.FC<Marker> = ({ lat, lng, address }) => {
  return (
    <Tooltip
      title={<AddressToolTip address={address ?? "Unknown Place"} />}
      arrow
      open
      placement="top"
      // classes={{ tooltip: "custom-tooltip" }}
    >
      <i className="location-marker">
        {" "}
        <LocationOnIcon className="custom-marker-color" />{" "}
      </i>
    </Tooltip>
  );
};

export default LocationMarker;
