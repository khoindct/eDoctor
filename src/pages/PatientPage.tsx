import { Backdrop, Box, CircularProgress, Grid } from "@material-ui/core";
import { useQuery } from "react-query";
import api from "../api";
import Page from "../components/Page";
import PatientCard from "../components/patient/PatientCard";
import { IUser } from "../types";
import "./PatientPage.scss";

interface IPatientResponse {
  totalBooking: number;
  user: IUser;
}

const PatientPage: React.FC = () => {
  const axios = api();

  const getBookedUsers = async () => {
    const { data } = await axios.get("/bookings/users/stats");
    const result = data.data.users;
    return result;
  };

  const { isLoading, data: bookedUsers } = useQuery(
    "bookedUsers",
    getBookedUsers,
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  );

  if (isLoading) {
    return (
      <Page className="" title="Dashboard">
        <Backdrop className="backdrop" open>
          <CircularProgress color="secondary" />
        </Backdrop>
      </Page>
    );
  }

  return (
    <Page className="" title="Patients">
      <Box mt={5} />
      <Grid
        className="patient-dashboard-page"
        container
        justify="space-between"
      >
        {bookedUsers.map((user: IPatientResponse) => {
          const {
            totalBooking,
            user: {
              _id: id,
              name,
              phone,
              email,
              avatar: { url },
            },
          } = user;
          const patient = {
            id,
            name,
            phone,
            avatar: url,
            email,
            totalBookings: totalBooking,
          };
          return (
            <Grid key={patient.id} item xs={12} sm={6} md={3}>
              <PatientCard patient={patient} />
            </Grid>
          );
        })}
      </Grid>
    </Page>
  );
};

export default PatientPage;
