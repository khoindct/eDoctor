import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import React from "react";
import "./PatientCard.scss";

interface PatientCardProps {
  patient: {
    id: string;
    name: string;
    phone: string;
    avatar: string;
    email: string;
    totalBookings: number;
  };
}

const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  return (
    <React.Fragment>
      <Card className="profile">
        <CardContent className="profile__action">
          <div className="profile__info">
            <div className="profile__avatar--border">
              <Avatar
                alt="Remy Sharp"
                src={patient?.avatar || "../assets/images/default-avatar.jpg"}
                className="profile__avatar"
              />
            </div>
            <Typography
              className="profile__name"
              variant="body2"
              color="textSecondary"
              component="h6"
            >
              {patient.name}
            </Typography>
          </div>
        </CardContent>
        <CardContent>
          <Divider />
          <Box mt={3} />
          <Grid className="patient__info" container direction="column">
            <Grid container item>
              <h6 className="patient__title">Email</h6>
              <Box ml="auto" />
              <p className="patient__detail">{patient.email}</p>
            </Grid>
            <Grid container item>
              <h6 className="patient__title">Phone</h6>
              <Box ml="auto" />
              <p className="patient__detail">{patient.phone}</p>
            </Grid>
            <Grid container item>
              <h6 className="patient__title">Total Booking</h6>
              <Box ml="auto" />
              <p className="patient__detail">{patient.totalBookings}</p>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            className="profile__button"
            size="medium"
            color="primary"
            fullWidth
          >
            Details
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

export default PatientCard;
