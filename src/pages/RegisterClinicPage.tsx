import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDropzone } from "react-dropzone";
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
import axios from "axios";

interface IFormInput {
  email: string;
  name: string;
  address: string;
  phone: string;
  coverImage: string;
  description: string;
  geometry: {
    type: "Point";
    coordinates: number[];
  };
  schedule: any;
}

const RegisterClinicPage = () => {
  const navigate = useNavigate();
  const [coverImage, setCoverImage] = useState<any>();
  const [saveCoverImage, setSaveCoverImage] = useState<any>();
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setCoverImage(
        Object.assign(acceptedFiles[0], {
          preview: window.URL.createObjectURL(new Blob(acceptedFiles)),
        })
      );
      setSaveCoverImage(acceptedFiles[0]);
    },
    multiple: false,
  });
  const { control, handleSubmit } = useForm<IFormInput>();
  const { signup } = useActions();
  const { location, coordinates } = useTypedSelector(
    (state) => state.locations
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date("2014-08-18T21:11:54")
  );

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      window.URL.revokeObjectURL(coverImage?.preview);
    },
    [coverImage]
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const onSubmit = async (formData: IFormInput) => {
    formData.address = location;
    formData.geometry = {
      type: "Point",
      coordinates: [coordinates.lng, coordinates.lat],
    };
    formData.coverImage = saveCoverImage;
    const {
      address,
      coverImage,
      description,
      email,
      geometry,
      name,
      phone,
      schedule,
    } = formData;
    const data = new FormData();
    data.append("coverImage", coverImage);
    data.append("address", address);
    data.append("geometry", JSON.stringify(geometry));
    data.append("email", email);
    data.append("description", description);
    data.append("name", name);
    data.append("phone", phone);

    const res = await axios.post("http://localhost:8000/api/v1/clinics", data);
    console.log(res);

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
        <section className="clinic-image-container">
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
          <h4>{coverImage?.name ?? "Not have?"}</h4>
          <aside className="thumbs-container">
            <div className="thumb">
              <div className="thumb-inner">
                <img
                  src={coverImage?.preview ?? ""}
                  alt=""
                  className="clinic-image"
                />
              </div>
            </div>
          </aside>
        </section>
        <Button type="submit" color="primary" variant="contained">
          Save
        </Button>
      </form>
    </div>
  );
};

export default RegisterClinicPage;
