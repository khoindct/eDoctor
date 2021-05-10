import { useState } from "react";
import { useNavigate } from "react-router";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { Button, TextField, Typography } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import "./RegisterClinicPage.scss";
import Map from "../components/map/Map";
import SearchLocation from "../components/map/SearchLocation";

interface IFormInput {
  email: string;
  name: string;
  address: string;
  phone: string;
  coverImage: string;
  description: any;
  location: any;
  schedule: any;
}

const RegisterClinicPage = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<IFormInput>();
  const { signup } = useActions();
  const { authenticated, errorMessage } = useTypedSelector(
    (state) => state.auth
  );

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const onSubmit = (formData: IFormInput) => {
    console.log(formData);
    // signup(formData, () => navigate("/register-clinic"));
  };

  return (
    <div className="root">
      <form className="clinic-form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField label="Your email" {...field} />}
        />
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField label="Clinic Name" {...field} />}
        />
        <Controller
          name="phone"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField label="Clinic Phone" {...field} />}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField label="Description" multiline rows={6} {...field} />
          )}
        />
        <div className="working-hours">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className="row">
              <Typography className="working-day">DAY</Typography>
              <Typography className="working-day">OPEN</Typography>
              <Typography className="working-day">CLOSE</Typography>
            </div>
            <div className="row">
              <Typography className="working-day">Monday</Typography>
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </div>
            <div className="row">
              <Typography className="working-day">Tuesday</Typography>
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </div>
            <div className="row">
              <Typography className="working-day">Wednesday</Typography>
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </div>
            <div className="row">
              <Typography className="working-day">Thursday</Typography>
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </div>
            <div className="row">
              <Typography className="working-day">Friday</Typography>
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </div>
            <div className="row">
              <Typography className="working-day">Saturday</Typography>
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </div>
            <div className="row">
              <Typography className="working-day">Sunday</Typography>
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </div>
          </MuiPickersUtilsProvider>
        </div>
        <SearchLocation />
        <div className="clinic__map">
          <Map />
        </div>
        <Button variant="contained" component="label">
          Upload File
          <input type="file" hidden />
        </Button>
      </form>
    </div>
  );
};

export default RegisterClinicPage;
