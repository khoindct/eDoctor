import DateFnsUtils from "@date-io/date-fns";
import { Grid } from "@material-ui/core";
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import React from "react";
import {
  DeepMap,
  FieldError,
  UseFormGetValues,
  UseFormSetError,
  UseFormSetValue,
  UseFormClearErrors,
} from "react-hook-form";
import "./OpeningHoursPerDay.scss";
import { IFormInput } from "./controls.model";

interface IOpeningHoursPerDay {
  getValues?: UseFormGetValues<IFormInput>;
  setValue?: UseFormSetValue<IFormInput>;
  setError?: UseFormSetError<IFormInput>;
  clearErrors?: UseFormClearErrors<IFormInput>;
  errors: DeepMap<IFormInput, FieldError>;
  startDay:
    | "startTimeMonday"
    | "startTimeTuesday"
    | "startTimeWednesday"
    | "startTimeThursday"
    | "startTimeFriday"
    | "startTimeSaturday"
    | "startTimeSunday";

  endDay:
    | "endTimeMonday"
    | "endTimeTuesday"
    | "endTimeWednesday"
    | "endTimeThursday"
    | "endTimeFriday"
    | "endTimeSaturday"
    | "endTimeSunday";
  day: string;
}

const OpeningHoursPerDay: React.FC<IOpeningHoursPerDay> = ({
  getValues,
  setValue,
  setError,
  clearErrors,
  errors,
  startDay,
  endDay,
  day,
}) => {
  const [selectedStartDate, setSelectedStartDate] =
    React.useState<MaterialUiPickersDate>(new Date("2014-08-18T08:00:00"));
  const [selectedEndDate, setSelectedEndDate] =
    React.useState<MaterialUiPickersDate>(new Date("2014-08-18T17:00:00"));

  React.useEffect(() => {
    if (getValues && setValue) {
      setSelectedStartDate(getValues(startDay));
      setSelectedEndDate(getValues(endDay));
      setValue(startDay, getValues(startDay));
      setValue(endDay, getValues(endDay));
    }
    // eslint-disable-next-line
  }, []);

  const handleStartDateChange = (date: MaterialUiPickersDate) => {
    date && setValue && setValue(startDay, date);
    setSelectedStartDate(date);

    const endTime =
      selectedEndDate &&
      selectedEndDate.getHours() * 60 + selectedEndDate.getMinutes();
    const startTime = date && date.getHours() * 60 + date.getMinutes();
    endTime && startTime && endTime < startTime
      ? setError &&
        setError(startDay, {
          type: "manual",
          message: "Start time must before end time",
        })
      : clearErrors && clearErrors([startDay, endDay]);
  };

  const handleEndDateChange = (date: MaterialUiPickersDate) => {
    date && setValue && setValue(endDay, date);
    setSelectedEndDate(date);
    // Set errors for datetime
    const endTime = date && date.getHours() * 60 + date.getMinutes();
    const startTime =
      selectedStartDate &&
      selectedStartDate?.getHours() * 60 + selectedStartDate?.getMinutes();
    endTime && startTime && endTime < startTime
      ? setError &&
        setError(endDay, {
          type: "manual",
          message: "End time must after start time",
        })
      : clearErrors && clearErrors([startDay, endDay]);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container spacing={6} alignItems="baseline">
        <Grid item xs={3} style={{ alignSelf: "center" }}>
          <h6 className="opening-hours-day">{day}</h6>
        </Grid>
        <Grid item xs={4}>
          <KeyboardTimePicker
            margin="normal"
            value={selectedStartDate}
            onChange={handleStartDateChange}
            KeyboardButtonProps={{
              "aria-label": "change time",
            }}
            error={(errors as any)[startDay] && true}
            helperText={
              (errors as any)[startDay] && (errors as any)[startDay].message
            }
          />
        </Grid>
        <Grid item xs={4}>
          <KeyboardTimePicker
            margin="normal"
            value={selectedEndDate}
            onChange={handleEndDateChange}
            KeyboardButtonProps={{
              "aria-label": "change time",
            }}
            error={(errors as any)[endDay] && true}
            helperText={
              (errors as any)[endDay] && (errors as any)[endDay].message
            }
          />
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default OpeningHoursPerDay;
