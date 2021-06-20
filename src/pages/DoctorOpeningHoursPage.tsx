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
import Page from "../components/Page";
import { IFormInput } from "../components/register-clinic-form/controls.model";
import OpeningHoursPerDay from "../components/register-clinic-form/OpeningHoursPerDay";
import "./DoctorOpeningHoursPage.scss";

interface IScheduleDay {
  startTime: number;
  endTime: number;
  dayOfWeek: number;
}

const DoctorOpeningHoursPage: React.FC = () => {
  const axios = api();
  const { setValue, handleSubmit } = useForm<IFormInput>();
  const [modalSuccessOpen, setModalSuccessOpen] = useState<boolean>(false);
  const [modalErrorOpen, setModalErrorOpen] = useState<boolean>(false);
  const [backdropOpen, setBackdropOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const getClinicSchedule = async () => {
    const { data } = await axios.get("/clinics/detail/schedule");
    const schedule = data.data.data.schedule;
    console.log(schedule);
    const eventStart = new Date();
    eventStart.setUTCHours(1080, 480);
    console.log(typeof eventStart);
    setValue("startTimeSunday", eventStart);

    // const scheduleMap: any = new Map([
    //   [0, { startTime: "startTimeSunday", endTime: "endTimeSunday" }],
    //   [1, { startTime: "startTimeMonday", endTime: "endTimeMonday" }],
    //   [2, { startTime: "startTimeTuesday", endTime: "endTimeTuesday" }],
    //   [3, { startTime: "startTimeWednesday", endTime: "endTimeWednesday" }],
    //   [4, { startTime: "startTimeThursday", endTime: "endTimeThursday" }],
    //   [5, { startTime: "startTimeFriday", endTime: "endTimeFriday" }],
    //   [6, { startTime: "startTimeSaturday", endTime: "endTimeSaturday" }],
    // ]);

    // schedule.forEach((item: IScheduleDay) => {
    //   const eventStart = new Date();
    //   eventStart.setUTCHours(
    //     Math.floor(item.startTime / 60),
    //     item.startTime % 60
    //   );

    //   const eventEnd = new Date();
    //   eventEnd.setUTCHours(Math.floor(item.endTime / 60), item.endTime % 60);

    //   setValue(scheduleMap.get(item.dayOfWeek).startTime, eventStart);
    //   setValue(scheduleMap.get(item.dayOfWeek).endTime, eventEnd);
    // });

    return schedule;
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

  const { data: schedule, isLoading } = useQuery<IScheduleDay[]>(
    "clinicSchedule",
    getClinicSchedule,
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

  // Proceed to next step
  const onSubmit = async (formData: IFormInput) => {
    setBackdropOpen(true);
    setModalSuccessOpen(false);
    setModalErrorOpen(false);
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
            <form
              className="opening-hours-form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <OpeningHoursPerDay
                setValue={setValue}
                startDay="startTimeMonday"
                endDay="endTimeMonday"
                day="Monday"
              />
              <OpeningHoursPerDay
                setValue={setValue}
                startDay="startTimeTuesday"
                endDay="endTimeTuesday"
                day="Tuesday"
              />
              <OpeningHoursPerDay
                setValue={setValue}
                startDay="startTimeWednesday"
                endDay="endTimeWednesday"
                day="Wednesday"
              />
              <OpeningHoursPerDay
                setValue={setValue}
                startDay="startTimeThursday"
                endDay="endTimeThursday"
                day="Thursday"
              />
              <OpeningHoursPerDay
                setValue={setValue}
                startDay="startTimeFriday"
                endDay="endTimeFriday"
                day="Friday"
              />
              <OpeningHoursPerDay
                setValue={setValue}
                startDay="startTimeSaturday"
                endDay="endTimeSaturday"
                day="Saturday"
              />
              <OpeningHoursPerDay
                setValue={setValue}
                startDay="startTimeSunday"
                endDay="endTimeSunday"
                day="Sunday"
              />
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
