import { Box, Card, CardContent, Grid } from "@material-ui/core";
import { useForm } from "react-hook-form";
import CustomButton from "../components/CustomButton";
import Page from "../components/Page";
import { IFormInput } from "../components/register-clinic-form/controls.model";
import OpeningHoursPerDay from "../components/register-clinic-form/OpeningHoursPerDay";
import OpeningHoursStep from "../components/register-clinic-form/OpeningHoursStep";
import "./DoctorOpeningHoursPage.scss";

const DoctorOpeningHoursPage: React.FC = () => {
  const { setValue, handleSubmit } = useForm<IFormInput>();

  // Proceed to next step
  const onSubmit = () => {
    console.log("opening hours dashboard page");
  };

  return (
    <Page className="" title="Opening Hours">
      <>
        <Box mt={5} />
        <Card>
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
