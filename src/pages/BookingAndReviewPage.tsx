import { useState } from "react";
import {
  Avatar,
  Backdrop,
  Card,
  CircularProgress,
  Divider,
  Grid,
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
import { useMutation, useQuery } from "react-query";
import { Controller, useForm } from "react-hook-form";
import { useTypedSelector } from "../hooks/useTypedSelector";
import CustomModal from "../components/CustomModal";
import Page from "../components/Page";
import CustomFormHelperText from "../components/CustomFormHelperText";
import CustomTableOpeningHours from "../components/CustomTableOpeningHours";

interface IFormReply {
  reviewId: string;
  reply: string;
}

interface IFormComment {
  rating: number;
  review: string;
}

interface IFormBooking {
  bookedDate: Date;
  bookedTime: Date;
}

interface IClinicSchedule {
  dayOfWeek: number;
  startTime: number;
  endTime: number;
}

const BookingAndReviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    control,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
    handleSubmit: handleSubmitBooking,
  } = useForm<IFormBooking>();
  const {
    control: controlComment,
    setValue: setValueComment,
    formState: { errors: errorsComment },
    handleSubmit: handleSubmitComment,
  } = useForm<IFormComment>();
  const {
    control: controlReply,
    register: registerReply,
    setValue: setValueReply,
    formState: { errors: errorsReply },
    handleSubmit: handleSubmitReply,
  } = useForm<IFormReply>();
  const [selectedDate, setSelectedDate] = useState<string>();
  const [backdropOpen, setBackdropOpen] = useState<boolean>(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState<boolean>(false);
  const [modalErrorOpen, setModalErrorOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(
    "Something goes wrong. Please try again!"
  );
  const [dateRows, setDateRows] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const { authenticated } = useTypedSelector((state) => state.auth);

  const axios = api();
  const {
    data: clinic,
    isLoading,
    isError,
    error,
  } = useQuery(
    "clinicData",
    async () => {
      const response = await axios.get(`/clinics/${id}`);
      const clinic = response.data.data.data;
      let hours = clinic.schedule;

      hours = hours.map((data: any) => {
        const workingHours = data.workingHours.map((time: any) => [
          +time.startTime,
          +time.endTime,
        ]);
        return [...workingHours];
      });

      setDateRows(hours);
      setReviews(clinic.reviews);
      return clinic;
    },
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  );

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    setValue("bookedDate", new Date(date));
  };

  const mutationSubmitComment = useMutation(
    (formData) => {
      return axios.post(`/reviews/${id}`, formData);
    },
    {
      onSuccess: (data) => {
        const review = data.data.data.data;
        setReviews((prevState) => [...prevState, review]);
        setValueComment("rating", 0);
        setValueComment("review", "");
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

  const mutationSubmitBooking = useMutation(
    (formData) => {
      return axios.post(`/bookings/${id}`, formData);
    },
    {
      onSuccess: (data) => {
        // const booking = data.data.data.data;
        setBackdropOpen(false);
        setModalSuccessOpen(true);
      },
      onError: (error: any) => {
        setErrorMessage(
          "Unable to book an appointment. You have a pending request."
        );
        setBackdropOpen(false);
        setModalErrorOpen(true);
      },
    }
  );

  const mutationSubmitReply = useMutation(
    (formData: any) => {
      return axios.post(`/reviews/${formData.reviewId}`, formData.reply);
    },
    {
      onSuccess: (data) => {
        // const review = data.data.data.data;
        setValueReply("reply", "");
        setBackdropOpen(false);
      },
      onError: (error) => {
        console.error(error);
        setBackdropOpen(false);
      },
    }
  );

  const handleReplySubmit = async (data: IFormReply) => {
    const reply = data.reply;
    const reviewId = data.reviewId;
    const formData = { reply, reviewId };
    mutationSubmitReply.mutate(formData as any);
  };

  const handleBookFormSubmit = async (data: IFormBooking) => {
    if (!authenticated) {
      return navigate("/login");
    }
    ["bookedDate", "bookedTime"].forEach((value: any) => clearErrors(value));
    let { bookedDate, bookedTime } = data;
    bookedDate = new Date(bookedDate);
    bookedTime = new Date(bookedTime);
    const now = new Date(Date.now());
    // Check if user book appointment in the past
    [now, bookedDate].forEach((date) => date.setHours(0, 0, 0, 0));
    if (bookedDate.getTime() < now.getTime()) {
      setError("bookedDate", {
        type: "invalidBookedDate",
        message: "Please pick booking date in the future",
      });
      return;
    }
    // Get book date in working hour
    const workingDay = clinic.schedule.find(
      (row: IClinicSchedule) => row.dayOfWeek === bookedDate.getDay()
    );
    const { workingHours } = workingDay;
    // Check if working hours is closed
    // workingHours: []
    if (!workingHours.length) {
      setError("bookedTime", {
        type: "invalidBookedTime",
        message: `The clinic is closed. Please book in working time`,
      });
      return;
    }

    const time = bookedTime.getHours() * 60 + (bookedTime.getMinutes() % 60);
    // If working day is not open 24 hours
    if (
      !(workingHours.length === 1 && !workingHours[0][0] && !workingHours[0][1])
    ) {
      const isInWorkingHours = workingHours.some(
        (workingHour: any) =>
          workingHour.startTime <= time && time <= workingHour.endTime
      );
      if (!isInWorkingHours) {
        setError("bookedTime", {
          type: "invalidBookedTime",
          message: `The clinic is closed. Please book in working time`,
        });
        return;
      }
    }

    const formData = { bookedDate, bookedTime };
    mutationSubmitBooking.mutate(formData as any);

    setModalSuccessOpen(false);
    setModalErrorOpen(false);
  };

  const handleCommentSubmit = async (data: IFormComment) => {
    if (!authenticated) {
      return navigate("/login");
    }
    const rating = +data.rating;
    const review = data.review;
    const formData = { rating, review };
    mutationSubmitComment.mutate(formData as any);

    setModalSuccessOpen(false);
    setModalErrorOpen(false);
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {(error as any).message}</span>;
  }

  return (
    <Page className="booking-and-review-page" title="Booking and Review">
      {modalSuccessOpen && (
        <CustomModal type="success" message="Successfully save changes" />
      )}
      {modalErrorOpen && <CustomModal type="error" message={errorMessage} />}
      <Backdrop className="backdrop" open={isLoading || backdropOpen}>
        <CircularProgress color="secondary" />
      </Backdrop>
      <div className="booking-section">
        <CustomCarousel />
        <Card
          variant="outlined"
          classes={{ root: "booking__card--container" }}
          style={{ marginTop: "5rem" }}
        >
          <Grid container justify="space-evenly">
            <div className="opening">
              <CustomTableOpeningHours workingHours={dateRows} />
            </div>
            <form
              className="book-appointment-form"
              onSubmit={handleSubmitBooking(handleBookFormSubmit)}
            >
              {/* TODO: Use Controller from react hook form */}
              <Controller
                name="bookedDate"
                control={control}
                defaultValue={Date.now()}
                rules={{
                  required: "Booking date is not selected",
                }}
                render={({ field }) => (
                  <ReactNiceDate
                    updateDateValue={handleDateChange}
                    {...field}
                  />
                )}
              />

              <h6 className="book-appointment-title">
                Selected date:{" "}
                <span className="book-appointment-selected-date">
                  {moment(selectedDate).format("DD-MM-yyy")}
                </span>
              </h6>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                {/* TODO: Use Controller from react hook form */}
                <Controller
                  name="bookedTime"
                  control={control}
                  defaultValue={Date.now()}
                  rules={{
                    required: "Booking time is not selected",
                  }}
                  render={({ field }) => (
                    <KeyboardTimePicker
                      margin="normal"
                      KeyboardButtonProps={{
                        "aria-label": "change time",
                      }}
                      {...field}
                    />
                  )}
                />
              </MuiPickersUtilsProvider>
              {errors.bookedDate && (
                <CustomFormHelperText message={errors.bookedDate.message} />
              )}
              {errors.bookedTime && (
                <CustomFormHelperText message={errors.bookedTime.message} />
              )}
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
              onSubmit={handleSubmitComment(handleCommentSubmit)}
            >
              <Controller
                name="rating"
                control={controlComment}
                defaultValue=""
                rules={{
                  required: "Please add rating",
                  min: { value: 0.5, message: "Minimum rating is 0.5" },
                  max: { value: 5, message: "Maximum rating is 5" },
                }}
                render={({ field }) => (
                  <Rating
                    precision={0.5}
                    emptyIcon={<StarBorderIcon fontSize="inherit" />}
                    {...field}
                  />
                )}
              />
              <Controller
                name="review"
                control={controlComment}
                defaultValue=""
                rules={{
                  required: "Please add comment for our service",
                }}
                render={({ field }) =>
                  errorsComment.review ? (
                    <CustomTextField
                      error={true}
                      helperText={errorsComment.review.message}
                      placeholder="Write a public comment..."
                      rows={4}
                      isMultiline={true}
                      {...field}
                    />
                  ) : (
                    <CustomTextField
                      placeholder="Write a public comment..."
                      rows={4}
                      isMultiline={true}
                      {...field}
                    />
                  )
                }
              />
              {errorsComment.rating && (
                <CustomFormHelperText message={errorsComment.rating.message} />
              )}
              <CustomButton type="submit">Submit</CustomButton>
            </form>
          </div>
          <Divider className="mt-md" />

          {/* Show all reviews */}
          <div className="all-reviews">
            {!!reviews.length &&
              reviews.map((review) => (
                <Grid container key={review._id}>
                  <Grid item xs={1}>
                    <Avatar
                      alt="Remy Sharp"
                      // src="../assets/images/default-avatar.jpg"
                      src={
                        review?.user?.avatar ||
                        "../assets/images/default-avatar.jpg"
                      }
                    />
                  </Grid>
                  <Grid item xs={11}>
                    <Grid container direction="column">
                      <div className="review-name">{review?.user?.name}</div>
                      <Rating
                        name="customized-empty"
                        defaultValue={review?.rating}
                        readOnly
                        emptyIcon={<StarBorderIcon fontSize="inherit" />}
                      />
                      <div className="comments">{review.review}</div>
                    </Grid>
                  </Grid>
                  <Grid container style={{ marginTop: "2rem" }}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10}>
                      <Grid container>
                        <Grid item xs={1}>
                          <Avatar
                            classes={{ root: "comment__avatar" }}
                            alt="Remy Sharp"
                            src="../assets/images/default-avatar.jpg"
                          />
                        </Grid>
                        <Grid item xs={10}>
                          <form onSubmit={handleSubmitReply(handleReplySubmit)}>
                            <input
                              hidden
                              {...registerReply("reviewId")}
                              defaultValue={review._id}
                            />
                            <Controller
                              name="reply"
                              control={controlReply}
                              defaultValue=""
                              rules={{
                                required: "Reply cannot be empty",
                              }}
                              render={({ field }) =>
                                errorsReply.reply ? (
                                  <CustomTextField
                                    error={true}
                                    helperText={errorsReply.reply.message}
                                    placeholder="Type here to reply..."
                                    {...field}
                                  />
                                ) : (
                                  <CustomTextField
                                    placeholder="Type here to reply..."
                                    {...field}
                                  />
                                )
                              }
                            />
                          </form>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default BookingAndReviewPage;
