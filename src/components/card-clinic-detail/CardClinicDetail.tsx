import React from "react";
import {
  Box,
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
import CustomButton from "../CustomButton";

const CardClinicDetail: React.FC<any> = ({ clinic }) => {
  const navigate = useNavigate();
  const [ratingValue] = React.useState<number | null>(clinic.ratingAvg || 0);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const navigateToBooking = () =>
    navigate(`/book-clinic/${clinic._id}`, { replace: true });

  return (
    <Card className="clinic__content">
      <CardMedia
        classes={{ media: "clinic__image" }}
        component="img"
        src={clinic?.coverImage?.url}
        title="Clinic Cover Image"
      />
      <CardContent className="clinic__info">
        <h6 className="clinic__name">{clinic?.name}</h6>
        <p className="clinic__description mb-auto">{clinic?.description}</p>
        <Divider />
        <div className="clinic__action">
          <Rating name="half-rating-read" value={ratingValue} readOnly />
          {ratingValue !== null && (
            <Box ml={2} className="clinic__rating">
              {ratingValue}/5 ({clinic?.reviewCount})
            </Box>
          )}
          <CustomButton className="ml-auto" callback={navigateToBooking}>
            book now
          </CustomButton>
        </div>
      </CardContent>
      <CardActions disableSpacing className="clinic__location">
        <IconButton
          aria-label="detail location"
          classes={{ root: "icon-button-root" }}
        >
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
          <Map
            geometry={clinic?.geometry?.coordinates}
            address={clinic?.address}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default CardClinicDetail;
