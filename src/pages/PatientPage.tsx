import { Box, Grid } from "@material-ui/core";
import Page from "../components/Page";
import PatientCard from "../components/patient/PatientCard";
import "./PatientPage.scss";

const patient = {
  id: "1",
  name: "Jane Rotanson",
  phone: "0123456789",
  avatar: "../assets/images/default-avatar.jpg",
  email: "patient@gmail.com",
  totalBookings: 30,
};

const PatientPage: React.FC = () => {
  return (
    <Page className="" title="Patients">
      <Box mt={5} />
      <Grid
        className="patient-dashboard-page"
        container
        justify="space-between"
      >
        <Grid item xs={12} sm={6} md={3}>
          <PatientCard patient={patient} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <PatientCard patient={patient} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <PatientCard patient={patient} />
        </Grid>
      </Grid>
    </Page>
  );
};

export default PatientPage;
