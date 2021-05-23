import React from "react";
import { Box, Grid } from "@material-ui/core";
import CustomButton from "../CustomButton";
import { IFormStep } from "./controls.model";
import OpeningHoursPerDay from "./OpeningHoursPerDay";

const OpeningHoursStep: React.FC<IFormStep> = ({
  handleNext,
  handleBack,
  setValue,
}) => {
  const isValid = true;

  return (
    <>
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
      <Box ml="auto" mt={2} mr={2}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <CustomButton callback={handleBack}>Back</CustomButton>
          </Grid>
          <Grid item xs={6}>
            <CustomButton
              isDisabled={!isValid}
              callback={isValid ? handleNext : undefined}
            >
              Next
            </CustomButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default OpeningHoursStep;
