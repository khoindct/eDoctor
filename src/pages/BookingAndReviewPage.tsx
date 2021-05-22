import {useState} from 'react'
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
  TextField,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import Carousel from "../components/Carousel";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import CustomButton from "../components/CustomButton";
import ReactNiceDate from "../components/ReactNiceDate";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import "./BookingAndReviewPage.scss";

function createData(name: string, hours: string) {
  return { name, hours };
}

const rows = [
  createData("Monday", "08:00 - 17:00"),
  createData("Tuesday", "08:00 - 17:00"),
  createData("Wednesday", "08:00 - 17:00"),
  createData("Thursday", "08:00 - 17:00"),
  createData("Friday", "08:00 - 17:00"),
  createData("Saturday", "08:00 - 17:00"),
  createData("Sunday", "08:00 - 17:00"),
];

const BookingAndReviewPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleBookFormSubmit = () => {  }

  return (
    <div className="booking-and-review-page">
      <div className="booking-section">
        <Carousel />
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
                  {rows.map((row) => (
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
            <form className="book-appointment-form">
              <ReactNiceDate />
              <h6 className="book-appointment-title">Selected date: <span className="book-appointment-selected-date">date here</span></h6>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
              </MuiPickersUtilsProvider>
              <CustomButton type="submit" callback={handleBookFormSubmit}>Book</CustomButton>
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
            <form className="review-form">
              <Rating
                name="customized-empty"
                // defaultValue={2}
                precision={0.5}
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
              />
              <TextField
                id="outlined-multiline-static"
                placeholder="Write a public comment..."
                multiline
                rows={4}
                variant="outlined"
              />
            </form>
          </div>
          <Divider className="mt-md" />

          {/* Show all reviews */}
          <div className="all-reviews">
            <div className="review-input">
              <Avatar
                alt="Remy Sharp"
                src="../assets/images/default-avatar.jpg"
              />
              <div className="review-form">
                <Rating
                  name="customized-empty"
                  defaultValue={5}
                  readOnly
                  emptyIcon={<StarBorderIcon fontSize="inherit" />}
                />
                <div className="comments">Good service.</div>
              </div>
            </div>
            <div className="review-input">
              <Avatar
                alt="Remy Sharp"
                src="../assets/images/default-avatar.jpg"
              />
              <div className="review-form">
                <Rating
                  name="customized-empty"
                  defaultValue={5}
                  readOnly
                  emptyIcon={<StarBorderIcon fontSize="inherit" />}
                />
                <div className="comments">Good service.</div>
              </div>
            </div>
            <div className="review-input">
              <Avatar
                alt="Remy Sharp"
                src="../assets/images/default-avatar.jpg"
              />
              <div className="review-form">
                <Rating
                  name="customized-empty"
                  defaultValue={5}
                  readOnly
                  emptyIcon={<StarBorderIcon fontSize="inherit" />}
                />
                <div className="comments">Good service.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingAndReviewPage;
