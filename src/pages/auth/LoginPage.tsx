import { useNavigate } from "react-router-dom";
import Page from "../../components/Page";
import { useActions } from "../../hooks/useActions";
import { Avatar, Backdrop, CircularProgress, Grid } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import CustomTextField from "../../components/CustomTextField";
import CustomButton from "../../components/CustomButton";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import "./LoginPage.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { emailRegex } from "../../helpers/regex";

interface IFormInput {
  email: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [backdropOpen, setBackdropOpen] = useState<boolean>(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();
  const { signin } = useActions();
  const { authenticated, authorization, errorMessage } = useTypedSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (authenticated) {
      authorization === "patient" && navigate("/");
      authorization === "doctor" && navigate("/app/dashboard");
      authorization === "admin" && navigate("/admin/clinics");
    }
    // eslint-disable-next-line
  }, []);

  const cbLoginSubmitSuccess = () => {
    setBackdropOpen(false);
    navigate(-1);
  };

  const cbLoginSubmitError = () => {
    setBackdropOpen(false);
  };

  const onSubmit = (formData: IFormInput) => {
    setBackdropOpen(true);
    signin(
      formData,
      () => cbLoginSubmitSuccess(),
      () => cbLoginSubmitError()
    );
  };

  return (
    <Page className="sign-up-page" title="Login">
      <Backdrop className="backdrop" open={backdropOpen}>
        <CircularProgress color="secondary" />
      </Backdrop>
      <Avatar className="sign-up-avatar">
        <LockOutlinedIcon />
      </Avatar>
      <h6 className="sign-up-title">Log In</h6>
      <form onSubmit={handleSubmit(onSubmit)} className="sign-up-form">
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            pattern: { value: emailRegex, message: "Invalid email" },
            required: "Email cannot be empty",
          }}
          render={({ field }) =>
            errors.email ? (
              <CustomTextField
                error={true}
                helperText={errors.email?.message}
                label="Email Address"
                {...field}
              />
            ) : (
              <CustomTextField label="Email Address" {...field} />
            )
          }
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{
            required: "Password cannot be empty",
            minLength: {
              value: 8,
              message: "Password length must greater than 8",
            },
          }}
          render={({ field }) =>
            errors.password ? (
              <CustomTextField
                error={true}
                helperText={errors.password.message}
                label="Password"
                type="password"
                {...field}
              />
            ) : (
              <CustomTextField label="Password" type="password" {...field} />
            )
          }
        />
        <CustomButton type="submit">Sign In</CustomButton>
      </form>
      <Grid container justify="space-between">
        <Link to="/forgot-password" className="nav__link">
          <p className="sign-up-title">Forgot Password?</p>
        </Link>
      </Grid>
      {errorMessage && <h3>{errorMessage}</h3>}
    </Page>
  );
};

export default LoginPage;
