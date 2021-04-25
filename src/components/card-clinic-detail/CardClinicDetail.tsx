import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Typography,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

// styles
import useStyles from './styles';

const CardClinicDetail: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleFormSubmit = () => navigate('/app/customers', { replace: true });

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader title="Details" />
      <Divider />
      <CardContent>
        <div className={classes.details}>
          <div className={classes.details_row}>
            <Typography
              variant="h4"
              component="h4"
              style={{ color: 'rgb(23, 43, 77)' }}
            >
              Email
            </Typography>
            <Typography>demo@example.io</Typography>
          </div>
          <Divider />
          <div className={classes.details_row}>
            <Typography
              variant="h4"
              component="h4"
              style={{ color: 'rgb(23, 43, 77)' }}
            >
              Phone
            </Typography>
            <Typography>+55 748 327 439</Typography>
          </div>
          <Divider />
          <div className={classes.details_row}>
            <Typography
              variant="h4"
              component="h4"
              style={{ color: 'rgb(23, 43, 77)' }}
            >
              Country
            </Typography>
            <Typography>USA</Typography>
          </div>
          <Divider />
          <div className={classes.details_row}>
            <Typography
              variant="h4"
              component="h4"
              style={{ color: 'rgb(23, 43, 77)' }}
            >
              Address
            </Typography>
            <Typography>Street John Wick, no. 7</Typography>
          </div>
        </div>
      </CardContent>
      <Divider />
      <Box className={classes.button} display="flex" justifyContent="flex-end">
        <Button onClick={handleFormSubmit} color="primary" variant="contained">
          Save
        </Button>
      </Box>
    </Card>
  );
};

export default CardClinicDetail;
