import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
} from "@material-ui/core";
import "./ClinicModalBodyDetail.scss";
import CustomButton from "./CustomButton";

const ClinicModalBodyDetail = () => {
  return (
    <div className="clinic-detail-body-modal">
      <Card>
        <CardHeader
          title="Clinic Detail"
          classes={{
            title: "profile__title",
          }}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <h6 className="clinic-cover-image-title">Cover image:</h6>
            </Grid>
            <Grid item xs={9}>
              <Grid
                container
                direction="column"
                classes={{ root: "cover-image-container" }}
              >
                <img src="" alt="Clinic cover" className="clinic-cover-image" />
              </Grid>
            </Grid>
            <Grid item xs={6}>
              Clinic name
            </Grid>
            <Grid item xs={6}>
              Clinic phone
            </Grid>
            <Grid item xs={12}>
              Clinic email
            </Grid>
            <Grid item xs={12}>
              Clinic description
            </Grid>
            <Grid item xs={12}>
              Location here
            </Grid>
            <Box ml="auto" mt={2} mr={2}>
              <CustomButton>Save Changes</CustomButton>
            </Box>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClinicModalBodyDetail;
