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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient, useMutation, useQuery } from "react-query";
import api from "../api";
import CustomButton from "../components/CustomButton";
import CustomModal from "../components/CustomModal";
import EditOpeningHours from "../components/EditOpeningHours";
import Page from "../components/Page";
import {
  days,
  IFormInput,
} from "../components/register-clinic-form/controls.model";
import { getFormData } from "../helpers/form-data-helper";
import "./DoctorOpeningHoursPage.scss";

const DoctorOpeningHoursPage: React.FC = () => {
  const axios = api();
  const { setValue, handleSubmit } = useForm<IFormInput>();
  // const [workingHours, setWorkingHours] = useState<(number | null)[][]>([]);
  const [modalSuccessOpen, setModalSuccessOpen] = useState<boolean>(false);
  const [modalErrorOpen, setModalErrorOpen] = useState<boolean>(false);
  const [backdropOpen, setBackdropOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const updateScheduleFormValue = (value: (number | null)[][]) => {
    days.forEach((day, index) => setValue && setValue(day, value[index]));
  };

  const getClinicSchedule = async () => {
    const { data } = await axios.get("/clinics/detail/schedule");
    const schedule = data.data.data;

    const hours = schedule.map((data: any) => {
      const workingHours = data.workingHours.map((time: any) => [
        +time.startTime,
        +time.endTime,
      ]);
      return [...workingHours];
    });
    updateScheduleFormValue(hours);
    return hours;
  };

  const mutationUpdateSchedule = useMutation(
    (formData) => {
      return axios.patch(`/clinics/detail/schedule`, formData);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("clinicSchedule");
        setBackdropOpen(false);
        setModalSuccessOpen(true);
      },
      onError: (error) => {
        console.error(error);
        setBackdropOpen(false);
        setModalErrorOpen(true);
      },
    }
  );

  const { data: workingHours, isLoading } = useQuery<(number | null)[][]>(
    "clinicSchedule",
    getClinicSchedule,
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  );

  if (isLoading || !workingHours) {
    return (
      <Page className="" title="Dashboard">
        <Backdrop className="backdrop" open>
          <CircularProgress color="secondary" />
        </Backdrop>
      </Page>
    );
  }

  // Proceed to next step
  const onSubmit = async (formData: IFormInput) => {
    setBackdropOpen(true);
    setModalSuccessOpen(false);
    setModalErrorOpen(false);
    const data = getFormData(formData);
    console.log({ formData, data });
    mutationUpdateSchedule.mutate(formData as any);
  };

  return (
    <Page className="" title="Opening Hours">
      <>
        {modalSuccessOpen && (
          <CustomModal type="success" message="Successfully save changes" />
        )}
        {modalErrorOpen && (
          <CustomModal
            type="error"
            message="Something goes wrong. Please try again!"
          />
        )}
        <Backdrop className="backdrop" open={isLoading || backdropOpen}>
          <CircularProgress color="secondary" />
        </Backdrop>
        <Box mt={5} />
        <Card>
          <CardHeader
            title="Opening Hours"
            classes={{
              title: "profile__title",
            }}
          />
          <Divider />
          <CardContent>
            <EditOpeningHours
              handleDialogClose={updateScheduleFormValue}
              workingHours={workingHours}
            />
            <form
              className="opening-hours-form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Grid container justify="flex-end">
                <Box mt={4} mr={24}>
                  <CustomButton type="submit">Save Changes</CustomButton>
                </Box>
              </Grid>
            </form>
          </CardContent>
        </Card>

        <Box mb={5} />
      </>
    </Page>
  );
};

export default DoctorOpeningHoursPage;
