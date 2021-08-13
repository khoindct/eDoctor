import { Box, Grid } from "@material-ui/core";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import CustomButton from "../CustomButton";
import CustomAutoCompleteGoogleMaps from "../CustomGoogleMapAutoComplete";
import Map from "../map/Map";
import SearchLocation from "../map/SearchLocation";
import { IFormStep } from "./controls.model";

const LocationStep: React.FC<IFormStep> = ({ handleBack, control }) => {
  const { coordinates, location } = useTypedSelector(
    (state) => state.locations
  );

  return (
    <>
      <CustomAutoCompleteGoogleMaps />
      {/* <SearchLocation />
      {location && (
        <div className="clinic__map">
          <Map geometry={[coordinates.lng, coordinates.lat]} />
        </div>
      )}
      <Box ml="auto" mt={2} mr={2}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <CustomButton callback={handleBack}>Back</CustomButton>
          </Grid>
          <Grid item xs={6}>
            <CustomButton type="submit">Submit</CustomButton>
          </Grid>
        </Grid>
      </Box> */}
    </>
  );
};

export default LocationStep;
