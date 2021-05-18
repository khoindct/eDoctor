import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Divider,
  IconButton,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import classnames from "classnames";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useNavigate } from "react-router-dom";
import "./CardClinicDetail.scss";
import Map from "../map/Map";

const CardClinicDetail: React.FC = () => {
  const navigate = useNavigate();
  const [ratingValue, setRatingValue] = React.useState<number | null>(2);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const navigateToBooking = () => navigate("/app/customers", { replace: true });

  return (
    <Card className="clinic__content">
      <CardMedia
        classes={{ media: "clinic__image" }}
        component="img"
        src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
        title="Clinic Cover Image"
      />
      <CardContent className="clinic__info">
        <h6 className="clinic__name">Clinic Name Here</h6>
        <p className="clinic__description mb-auto">Description</p>
        <Divider />
        <div className="clinic__action">
          <Rating
            name="half-rating-read"
            value={ratingValue}
            onChange={(event, newValue) => {
              setRatingValue(newValue);
            }}
            readOnly
          />
          {ratingValue !== null && (
            <Box ml={2} className="clinic__rating">
              {ratingValue}/5
            </Box>
          )}
          <Button className="ml-auto" onClick={navigateToBooking}>
            Make An Appointment
          </Button>
        </div>
      </CardContent>
      <CardActions disableSpacing className="clinic__location">
        <IconButton aria-label="detail location">
          <LocationOnIcon className="mr-sm" />
          Clinic address
        </IconButton>
        <IconButton
          className={classnames("expand", {
            "expand-open": expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse
        className="clinic__map"
        in={expanded}
        timeout="auto"
        unmountOnExit
      >
        <CardContent>
          <Map />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default CardClinicDetail;
