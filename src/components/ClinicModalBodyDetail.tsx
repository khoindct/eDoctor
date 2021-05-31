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

const ClinicModalBodyDetail: React.FC<any> = ({ clinic }) => {
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
              <h6 className="clinic-cover-image-title">
                <b>Cover image</b>:
              </h6>
            </Grid>
            <Grid item xs={9}>
              <Grid
                container
                direction="column"
                classes={{ root: "cover-image-container" }}
              >
                <img
                  src={clinic?.coverImage?.url}
                  alt="Clinic cover"
                  className="clinic-cover-image"
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <h6 className="clinic-cover-image-title">
                <b>Name</b>: {clinic?.name ?? "None"}
              </h6>
            </Grid>
            <Grid item xs={12}>
              <h6 className="clinic-cover-image-title">
                <b>Phone</b>: {clinic?.phone ?? "None"}
              </h6>
            </Grid>
            <Grid item xs={12}>
              <h6 className="clinic-cover-image-title">
                <b>Email</b>: {clinic?.email ?? "None"}
              </h6>
            </Grid>
            <Grid item xs={12}>
              <h6 className="clinic-cover-image-title">
                <b>Description</b>: {clinic?.description ?? "None"}
              </h6>
            </Grid>
            <Grid item xs={12}>
              <h6 className="clinic-cover-image-title">
                <b>Location</b>: {clinic?.address ?? "None"}
              </h6>
            </Grid>
            <Box ml="auto" mt={2} mr={2}>
              <CustomButton>Approve</CustomButton>
            </Box>
            <Box mt={2} mr={2}>
              <CustomButton>Deny</CustomButton>
            </Box>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClinicModalBodyDetail;
