import { Avatar, Card, Divider, Grid, TextField } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import Carousel from "../components/Carousel";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import CustomButton from "../components/CustomButton";
import "./BookingAndReviewPage.scss";

const BookingAndReviewPage = () => {
  return (
    <div className="booking-and-review-page">
      <div className="booking-section">
        <Carousel />
        <Card
          variant="outlined"
          classes={{ root: "booking__card--container" }}
          style={{ marginTop: "5rem" }}
        >
          <Grid container justify="space-between">
            Opening Hours
            <Divider orientation="vertical" flexItem />
            Book Appointment
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
