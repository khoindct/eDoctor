import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { ChangeEvent } from "react";
import { useActions } from "../../hooks/useActions";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const SearchLocation = () => {
  const { getLocation } = useActions();

  const {
    value,
    suggestions: { data },
    setValue,
  } = usePlacesAutocomplete({ debounce: 500 });

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
        options={data.map((suggestion) => suggestion.description)}
        onChange={(e, value) => handleChangeInput(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Location"
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
