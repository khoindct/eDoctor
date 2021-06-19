import { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { ChangeEvent } from "react";
import { useActions } from "../../hooks/useActions";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import "./SearchLocation.scss";

interface ISearchLocation {
  address?: string;
}

const SearchLocation: React.FC<ISearchLocation> = ({ address = "" }) => {
  const { getLocation } = useActions();

  const {
    value,
    suggestions: { data },
    setValue,
  } = usePlacesAutocomplete({ debounce: 500 });

  useEffect(() => {
    if (address) {
      data.push(address as any);
    }
    // eslint-disable-next-line
  }, []);

  const handleInput = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    // Place a "string" to update the value of the input element
    setValue(e.target.value);
  };

  const handleChangeInput = (value: string | null) => {
    const parameter = {
      address: value || "",
    };
    getGeocode(parameter)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        const { lat, lng } = latLng;
        const geometry = {
          location: parameter.address,
          coordinates: {
            lat,
            lng,
          },
        };
        getLocation(geometry);
        console.log("Coordinates: ", { lat, lng });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  return (
    <>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        value={address}
        classes={{ option: "autoComplete-text" }}
        options={data.map((suggestion) => suggestion.description)}
        onChange={(e, value) => handleChangeInput(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            InputLabelProps={{
              classes: {
                root: "form--input",
              },
            }}
            label="Enter your location"
            margin="normal"
            variant="outlined"
            value={value}
            onChange={(e) => handleInput(e)}
          />
        )}
      />
    </>
  );
};

export default SearchLocation;
