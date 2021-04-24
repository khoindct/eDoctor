import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

// styles
import useStyles from "./styles";

const CardClinicForm: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleFormSubmit = () => navigate("/app/customers", { replace: true });

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader title="Details" />
      <Divider />
      <CardContent>
        <Formik
          initialValues={{
            name: "John Doe",
            email: "demo@example.io",
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Must be a valid email")
              .max(255)
              .required("Email is required"),
            password: Yup.string().max(255).required("Password is required"),
          })}
          onSubmit={handleFormSubmit}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <form onSubmit={handleSubmit} className={classes.form}>
              <TextField
                error={Boolean(touched.name && errors.name)}
                fullWidth
                helperText={touched.name && errors.name}
                label="Name"
                margin="normal"
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                type="name"
                value={values.name}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.email && errors.email)}
                fullWidth
                helperText={touched.email && errors.email}
                label="Email Address"
                margin="normal"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                type="email"
                value={values.email}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Phone Number"
                margin="normal"
                name="phone"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Country"
                margin="normal"
                name="country"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="City"
                margin="normal"
                name="City"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                variant="outlined"
              />
            </form>
          )}
        </Formik>
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

export default CardClinicForm;
