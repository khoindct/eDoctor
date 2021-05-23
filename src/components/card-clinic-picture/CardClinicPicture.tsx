import { Card, CardHeader, CardMedia, Divider } from "@material-ui/core";

// styles
import useStyles from "./styles";

const CardClinicPicture: React.FC = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader title="Clinic Photo" />
      <Divider />
      <div className={classes.photo}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          image="https://react-material-kit.devias.io/static/mock-images/avatars/avatar-jane_rotanson.png"
          title="Contemplative Reptile"
        />
      </div>
    </Card>
  );
};

export default CardClinicPicture;
