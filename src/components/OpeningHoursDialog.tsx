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

interface IOpeningHoursDialog {
  classes: Record<"paper", string>;
  id: string;
  keepMounted: boolean;
  value: string;
  open: boolean;
  onClose: (value?: string) => void;
}

interface IOpeningHoursInput {
  index: number;
  handleRemove: (index: number) => void;
}

const OpeningHoursInput: React.FC<IOpeningHoursInput> = ({
  index,
  handleRemove,
}) => {
  const [startdDate, setStartDate] =
    React.useState<MaterialUiPickersDate>(null);
  const [endDate, setEndDate] = React.useState<MaterialUiPickersDate>(null);

  const handleStartDateChange = (date: MaterialUiPickersDate) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: MaterialUiPickersDate) => {
    setEndDate(date);
  };

  return (
    <>
      <Grid item xs={4}>
        <KeyboardTimePicker
          margin="normal"
          label="Open time"
          value={startdDate}
          onChange={handleStartDateChange}
          KeyboardButtonProps={{
            "aria-label": "change time",
          }}
        />
      </Grid>
      <Grid item xs={2}></Grid>
      <Grid item xs={4}>
        <KeyboardTimePicker
          margin="normal"
          label="Close time"
          value={endDate}
          onChange={handleEndDateChange}
          KeyboardButtonProps={{
            "aria-label": "change time",
          }}
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
  const [state, setState] = useState({
    checkedMonday: false,
    checkedTuesday: false,
    checkedWednesday: false,
    checkedThursday: false,
    checkedFriday: false,
    checkedSaturday: false,
    checkedSunday: false,
  });
  const [stateSpecial, setStateSpecial] = useState({
    checkedOpen: false,
    checkedClose: false,
  });
  const hasSpecialState = stateSpecial.checkedOpen || stateSpecial.checkedClose;

  useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  useEffect(() => {
    if (hasSpecialState) {
      setHours([]);
    }
    if (!hasSpecialState) {
      const newHour = [
        <OpeningHoursInput index={0} handleRemove={handleRemoveHours} />,
      ];
      setHours(newHour);
    }
  }, [stateSpecial]);

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  const handleRemoveHours = (index: number) => {
    let newHours = [...hours];
    if (!index) newHours.shift();
    else newHours.splice(index, 1);
    setHours(newHours);
  };

  const handleAddHours = () => {
    const length = hours.length;
    setHours((prevState) => [
      ...prevState,
      <OpeningHoursInput index={length} handleRemove={handleRemoveHours} />,
    ]);
  };

  const [hours, setHours] = useState([
    <OpeningHoursInput index={0} handleRemove={handleRemoveHours} />,
  ]);

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
        <Button onClick={handleOk} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OpeningHoursDialog;
