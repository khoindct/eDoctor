import { useState } from "react";
import {
  Backdrop,
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
} from "@material-ui/core";
import { useMutation, useQueryClient } from "react-query";
import api from "../api";
import "./AppointmentModalBodyDetail.scss";
import CustomButton from "./CustomButton";
import CustomModal from "./CustomModal";

const AppointmentModalBodyDetail: React.FC<any> = ({ appointment }) => {
  const axios = api();
  const queryClient = useQueryClient();
  const [backdropOpen, setBackdropOpen] = useState<boolean>(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState<boolean>(false);
  const [modalErrorOpen, setModalErrorOpen] = useState<boolean>(false);

  const mutationSubmitAppointment = useMutation(
    (formData) => {
      return axios.put(`/appointments/${appointment._id}`, formData);
    },
    {
      onSuccess: (_) => {
        queryClient.invalidateQueries("allAppointments");
        setBackdropOpen(false);
        setModalSuccessOpen(true);
        setModalErrorOpen(false);
      },
      onError: (error) => {
        console.error(error);
        setBackdropOpen(false);
        setModalSuccessOpen(false);
        setModalErrorOpen(true);
      },
    }
  );

  const handleApproveAppointment = () => {
    setBackdropOpen(true);
    setModalSuccessOpen(false);
    setModalErrorOpen(false);
    const data = { status: "approved" };
    mutationSubmitAppointment.mutate(data as any);
  };

  const handleDenyAppointment = () => {
    setBackdropOpen(true);
    setModalSuccessOpen(false);
    setModalErrorOpen(false);
    const data = { status: "denied" };
    mutationSubmitAppointment.mutate(data as any);
  };

  return (
    <div className="Appointment-detail-body-modal">
      {modalSuccessOpen && (
        <CustomModal
          type="success"
          message="Successfully approve Appointment."
        />
      )}
      {modalErrorOpen && (
        <CustomModal
          type="error"
          message="Something goes wrong. Please try again!"
        />
      )}
      <Backdrop className="backdrop" open={backdropOpen}>
        <CircularProgress color="secondary" />
      </Backdrop>
      <Card>
        <CardHeader
          title="Appointment Detail"
          classes={{
            title: "profile__title",
          }}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              Appointment Details Here
            </Grid>
            <Box ml="auto" mt={2} mr={2}>
              <CustomButton callback={handleApproveAppointment}>
                Approve
              </CustomButton>
            </Box>
            <Box mt={2} mr={2}>
              <CustomButton callback={handleDenyAppointment}>Deny</CustomButton>
            </Box>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentModalBodyDetail;
