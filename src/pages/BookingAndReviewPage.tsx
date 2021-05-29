import { useState } from "react";
import {
  Avatar,
  Card,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import CustomCarousel from "../components/CustomCarousel";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import CustomButton from "../components/CustomButton";
import ReactNiceDate from "../components/ReactNiceDate";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import "./BookingAndReviewPage.scss";
import CustomTextField from "../components/CustomTextField";
import { useNavigate, useParams } from "react-router";
import api from "../api";
import { useQuery } from "react-query";
import { Controller, useForm } from "react-hook-form";
import { useTypedSelector } from "../hooks/useTypedSelector";

const createDateData = (
  dayOfWeek: number,
  startTime: number,
  endTime: number
) => {
  const dataMap = new Map([
    [0, "Sunday"],
    [1, "Monday"],
    [2, "Tuesday"],
    [3, "Wednesday"],
    [4, "Thursday"],
    [5, "Friday"],
    [6, "Saturday"],
  ]);
  return {
    name: dataMap.get(dayOfWeek),
    hours: `${String(startTime / 60).padStart(2, "0")}:${String(
      startTime % 60
    ).padStart(2, "0")} - ${String(endTime / 60).padStart(2, "0")}:${String(
      endTime % 60
    ).padStart(2, "0")}`,
  };
};

const BookingAndReviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm();
  const [selectedDate, setSelectedDate] = useState<string>();
  const [selectedTime, setSelectedTime] = useState<Date | null>();
  const [dateRows, setDateRows] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const { authenticated } = useTypedSelector((state) => state.auth);

  const axios = api();
  const { isLoading, isError, error, status } = useQuery(
    "clinicData",
    async () => {
      const response = await axios.get(`/clinics/${id}`);
      const clinic = response.data.data.data;
      setDateRows(
        clinic.schedule.map((row: any) =>
          createDateData(row.dayOfWeek, row.startTime, row.endTime)
        )
      );
      setReviews(clinic.reviews);
      return response.data;
    }
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {(error as any).message}</span>;
  }

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (date: Date | null) => {
    setSelectedTime(date);
  };

  const handleBookFormSubmit = async () => {
    if (!authenticated) {
      return navigate("/login");
    }
    const bookedDate = new Date(Date.parse(selectedDate as any));
    const bookedTime = selectedTime;
    const formData = { bookedDate, bookedTime };
    await axios.post(`/bookings/${id}`, formData);
  };

  const handleCommentSubmit = async (data: any) => {
    if (!authenticated) {
      return navigate("/login");
    }
    const rating = +data.rating;
    const review = data.review;
    const formData = { rating, review };
    await axios.post(`/reviews/${id}`, formData);
  };

  return (
    <div className="booking-and-review-page">
      <div className="booking-section">
        <CustomCarousel />
        <Card
          variant="outlined"
          classes={{ root: "booking__card--container" }}
          style={{ marginTop: "5rem" }}
        >
          <Grid container justify="space-evenly">
            <div className="opening">
              <Table className="table" aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      classes={{ body: "table__body", head: "table__head" }}
                    >
                      Opening Hours
                    </TableCell>
                    <TableCell
                      classes={{ body: "table__body", head: "table__head" }}
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dateRows?.map((row: any) => (
                    <TableRow key={row.name}>
                      <TableCell
                        classes={{ body: "table__body", head: "table__head" }}
                        component="th"
                        scope="row"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell
                        classes={{ body: "table__body", head: "table__head" }}
                        align="right"
                      >
                        {row.hours}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <form
              className="book-appointment-form"
              onSubmit={handleSubmit(handleBookFormSubmit)}
            >
              <ReactNiceDate updateDateValue={handleDateChange} />
              <h6 className="book-appointment-title">
                Selected date:{" "}
                <span className="book-appointment-selected-date">
                  {moment(selectedDate).format("DD-MM-yyy")}
                </span>
              </h6>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  value={selectedTime}
                  onChange={handleTimeChange}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
              </MuiPickersUtilsProvider>
              <CustomButton type="submit">Book</CustomButton>
            </form>
          </Grid>
        </Card>
      </div>
      <div className="review-section">
        <div className="review-content">
          <h6 className="review-title mb-md">Reviews</h6>

          {/* Review Form for User */}
          <div className="review-input">
            <Avatar
              alt="Remy Sharp"
              src="../assets/images/default-avatar.jpg"
            />
            <form
              className="review-form"
              onSubmit={handleSubmit(handleCommentSubmit)}
            >
              <Controller
                name="rating"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Rating
                    // defaultValue={2}
                    precision={0.5}
                    emptyIcon={<StarBorderIcon fontSize="inherit" />}
                    {...field}
                  />
                )}
              />
              <Controller
                name="review"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <CustomTextField
                    placeholder="Write a public comment..."
                    rows={4}
                    isMultiline={true}
                    {...field}
                  />
                )}
              />

              <CustomButton type="submit">Submit</CustomButton>
            </form>
          </div>
          <Divider className="mt-md" />

          {/* Show all reviews */}
          <div className="all-reviews">
            {!!reviews.length &&
              reviews.map((review) => (
                <div key={review._id} className="review-input">
                  <Avatar
                    alt="Remy Sharp"
                    // src="../assets/images/default-avatar.jpg"
                    src={
                      review.user?.avatar ||
                      "../assets/images/default-avatar.jpg"
                    }
                  />
                  <div className="review-form">
                    <Rating
                      name="customized-empty"
                      defaultValue={review.rating}
                      readOnly
                      emptyIcon={<StarBorderIcon fontSize="inherit" />}
                    />
                    <div className="comments">{review.review}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingAndReviewPage;
