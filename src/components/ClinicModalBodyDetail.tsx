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
import "./ClinicModalBodyDetail.scss";
import CustomButton from "./CustomButton";
import CustomModal from "./CustomModal";

const ClinicModalBodyDetail: React.FC<any> = ({ clinic }) => {
  const axios = api();
  const queryClient = useQueryClient();
  const [backdropOpen, setBackdropOpen] = useState<boolean>(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState<boolean>(false);
  const [modalErrorOpen, setModalErrorOpen] = useState<boolean>(false);

  const mutationSubmitClinic = useMutation(
    (formData) => {
      return axios.put(`/clinics/${clinic._id}`, formData);
    },
    {
      onSuccess: (_) => {
        queryClient.invalidateQueries("allClinics");
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

  const handleApproveClinic = () => {
    setBackdropOpen(true);
    setModalSuccessOpen(false);
    setModalErrorOpen(false);
    const data = { status: "approved" };
    mutationSubmitClinic.mutate(data as any);
  };

  const handleDenyClinic = () => {
    setBackdropOpen(true);
    setModalSuccessOpen(false);
    setModalErrorOpen(false);
    const data = { status: "denied" };
    mutationSubmitClinic.mutate(data as any);
  };

  return (
    <div className="clinic-detail-body-modal">
      {modalSuccessOpen && (
        <CustomModal type="success" message="Successfully approve clinic." />
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
              <CustomButton callback={handleApproveClinic}>
                Approve
              </CustomButton>
            </Box>
            <Box mt={2} mr={2}>
              <CustomButton callback={handleDenyClinic}>Deny</CustomButton>
            </Box>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClinicModalBodyDetail;
