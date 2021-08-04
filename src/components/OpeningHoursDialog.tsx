import DateFnsUtils from "@date-io/date-fns";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormControlLabel,
  DialogActions,
  Button,
  Checkbox,
  Grid,
  IconButton,
} from "@material-ui/core";
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import React, { useState, useEffect, useRef } from "react";
import CloseIcon from "@material-ui/icons/Close";
import "./OpeningHoursDialog.scss";
import { transformToNumber } from "../helpers/datetime-helper";

interface IOpeningHoursDialog {
  classes: Record<"paper", string>;
  id: string;
  keepMounted: boolean;
  value: (number | null)[][];
  open: boolean;
  onClose: (value?: (number | null)[][]) => void;
}

interface IOpeningHoursInput {
  index: number;
  handleRemove: (index: number) => void;
  handleResultChange: (
    date: MaterialUiPickersDate,
    index: number,
    position: number
  ) => void;
}

const OpeningHoursInput: React.FC<IOpeningHoursInput> = ({
  index,
  handleRemove,
  handleResultChange,
}) => {
  const [startDate, setStartDate] = React.useState<MaterialUiPickersDate>(null);
  const [endDate, setEndDate] = React.useState<MaterialUiPickersDate>(null);
  const [startDateError, setStartDateError] = React.useState(false);
  const [endDateError, setEndDateError] = React.useState(false);

  const handleStartDateChange = (date: MaterialUiPickersDate) => {
    setStartDate(date);
    if (date && endDate && date?.getTime() >= endDate?.getTime()) {
      setStartDateError(true);
      return;
    }
    setStartDateError(false);
    handleResultChange(date, index, 0);
  };

  const handleEndDateChange = (date: MaterialUiPickersDate) => {
    setEndDate(date);
    if (date && startDate && date?.getTime() <= startDate?.getTime()) {
      setEndDateError(true);
      return;
    }
    setEndDateError(false);
    handleResultChange(date, index, 1);
  };

  return (
    <>
      <Grid item xs={4}>
        <KeyboardTimePicker
          initialFocusedDate={new Date(0, 0, 0, 0)}
          margin="normal"
          label="Open time"
          value={startDate}
          onChange={handleStartDateChange}
          KeyboardButtonProps={{
            "aria-label": "change time",
          }}
          error={startDateError}
          helperText={startDateError && "Open time must be sooner"}
        />
      </Grid>
      <Grid item xs={2}></Grid>
      <Grid item xs={4}>
        <KeyboardTimePicker
          initialFocusedDate={new Date(0, 0, 0, 0)}
          margin="normal"
          label="Close time"
          value={endDate}
          onChange={handleEndDateChange}
          KeyboardButtonProps={{
            "aria-label": "change time",
          }}
          error={endDateError}
          helperText={endDateError && "Close time must be later"}
        />
      </Grid>
      <Grid item xs={2}>
        <IconButton
          color="primary"
          aria-label="remove"
          component="span"
          onClick={() => handleRemove(index)}
        >
          <CloseIcon />
        </IconButton>
      </Grid>
    </>
  );
};

const OpeningHoursDialog: React.FC<IOpeningHoursDialog> = ({
  onClose,
  value: valueProp,
  open,
  ...other
}) => {
  const [value, setValue] = useState(valueProp);
  const [result, setResult] = useState<(number | null)[][]>([[]]); // Array contains hours values according to number of hour fields
  const [state, setState] = useState({
    checkedSunday: false,
    checkedMonday: false,
    checkedTuesday: false,
    checkedWednesday: false,
    checkedThursday: false,
    checkedFriday: false,
    checkedSaturday: false,
  });
  const [stateSpecial, setStateSpecial] = useState({
    checkedOpen: false,
    checkedClose: false,
  });
  const isDayChecked = Object.keys(state).some((day) => (state as any)[day]);
  const hasSpecialState = stateSpecial.checkedOpen || stateSpecial.checkedClose;

  const handleRemoveHours = (index: number) => {
    setHours((prevState) => prevState.filter((_, i) => i !== index));
    setResult((prevState) => prevState.filter((_, i) => i !== index));
  };

  const handleResultChange = (
    date: MaterialUiPickersDate,
    index: number,
    position: number
  ) => {
    setResult((prevState) => {
      prevState[index][position] = transformToNumber(date);
      return prevState;
    });
  };

  const [hours, setHours] = useState([
    <OpeningHoursInput
      index={0}
      handleRemove={handleRemoveHours}
      handleResultChange={handleResultChange}
    />,
  ]); // Input working hours fields

  useEffect(() => {
    // If there is value (edit case)
    // Update result
    console.log(result);
  }, [result]); //TODO: remove dependency

  useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  useEffect(() => {
    // Display hours input
    if (hasSpecialState) {
      setHours([]);
    }
    // Add hours input when user uncheck special state
    if (!hasSpecialState) {
      const newHour = [
        <OpeningHoursInput
          index={0}
          handleRemove={handleRemoveHours}
          handleResultChange={handleResultChange}
        />,
      ];
      setHours(newHour);
    }

    if (stateSpecial.checkedClose) setResult([]);
    if (stateSpecial.checkedOpen) setResult([[0, 0]]);
  }, [stateSpecial]);

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    const workingHours = Array(7).fill([]);
    Object.keys(state).forEach(
      (day, index) => (state as any)[day] && (workingHours[index] = [...result])
    );
    onClose(workingHours);
  };

  const handleAddHours = () => {
    const length = hours.length;
    setHours((prevState) => [
      ...prevState,
      <OpeningHoursInput
        index={length}
        handleRemove={handleRemoveHours}
        handleResultChange={handleResultChange}
      />,
    ]);
    setResult((prevState) => [...prevState, []]);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleSpecialChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "checkedOpen") {
      setStateSpecial({
        checkedOpen: event.target.checked,
        checkedClose: false,
      });
    }

    if (event.target.name === "checkedClose") {
      setStateSpecial({
        checkedOpen: false,
        checkedClose: event.target.checked,
      });
    }
  };

  return (
    <Dialog
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">Chọn ngày & giờ</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedSunday}
                  onChange={handleChange}
                  name="checkedSunday"
                />
              }
              label="S"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedMonday}
                  onChange={handleChange}
                  name="checkedMonday"
                />
              }
              label="M"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedTuesday}
                  onChange={handleChange}
                  name="checkedTuesday"
                />
              }
              label="T"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedWednesday}
                  onChange={handleChange}
                  name="checkedWednesday"
                />
              }
              label="W"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedThursday}
                  onChange={handleChange}
                  name="checkedThursday"
                />
              }
              label="T"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedFriday}
                  onChange={handleChange}
                  name="checkedFriday"
                />
              }
              label="F"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedSaturday}
                  onChange={handleChange}
                  name="checkedSaturday"
                />
              }
              label="S"
            />
          </Grid>{" "}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={stateSpecial.checkedOpen}
                  onChange={handleSpecialChange}
                  name="checkedOpen"
                />
              }
              label="Open 24 hours"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={stateSpecial.checkedClose}
                  onChange={handleSpecialChange}
                  name="checkedClose"
                />
              }
              label="Closed"
            />
          </Grid>
        </Grid>
        <Grid container>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container>
              {hours.map((item, index) =>
                React.cloneElement(item, {
                  key: index,
                  index,
                  handleRemove: handleRemoveHours,
                })
              )}
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
        {hasSpecialState ? (
          <></>
        ) : (
          <Button onClick={handleAddHours} color="primary">
            Add hours
          </Button>
        )}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary" disabled={!isDayChecked}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OpeningHoursDialog;
