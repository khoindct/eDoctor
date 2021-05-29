import DateFnsUtils from "@date-io/date-fns";
import { Grid } from "@material-ui/core";
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import React from "react";
import { UseFormSetValue } from "react-hook-form";
import "./OpeningHoursPerDay.scss";
import { IFormInput } from "./controls.model";

interface IOpeningHoursPerDay {
  setValue?: UseFormSetValue<IFormInput>;
  startDay: string;
  endDay: string;
  day: string;
}

const OpeningHoursPerDay: React.FC<IOpeningHoursPerDay> = ({
  setValue,
  startDay,
  endDay,
  day,
}) => {
  const [selectedStartDate, setSelectedStartDate] =
    React.useState<MaterialUiPickersDate>(new Date("2014-08-18T08:00:00"));
  const [selectedEndDate, setSelectedEndDate] =
    React.useState<MaterialUiPickersDate>(new Date("2014-08-18T17:00:00"));

  React.useEffect(() => {
    if (setValue) {
      setValue(startDay as any, selectedStartDate);
      setValue(endDay as any, selectedEndDate);
    }
    // eslint-disable-next-line
  }, []);

  const handleStartDateChange = (date: MaterialUiPickersDate) => {
    setValue && setValue(startDay as any, date);
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date: MaterialUiPickersDate) => {
    setValue && setValue(endDay as any, date);
    setSelectedEndDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container spacing={6} alignItems="center">
        <Grid item xs={3}>
          <h6 className="opening-hours-day">{day}</h6>
        </Grid>
        <Grid item xs={4}>
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            value={selectedStartDate}
            onChange={handleStartDateChange}
            KeyboardButtonProps={{
              "aria-label": "change time",
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            value={selectedEndDate}
            onChange={handleEndDateChange}
            KeyboardButtonProps={{
              "aria-label": "change time",
            }}
          />
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default OpeningHoursPerDay;
