import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { Avatar, Backdrop, CircularProgress } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import CustomTextField from "../../components/CustomTextField";
import CustomButton from "../../components/CustomButton";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import "./SignupPage.scss";
import Page from "../../components/Page";
import { emailRegex, nameRegex } from "../../helpers/regex";

interface IFormInput {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  role?: string;
}

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [backdropOpen, setBackdropOpen] = useState<boolean>(false);
  const {
    control,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();
  const { signup } = useActions();
  const { authenticated, errorMessage } = useTypedSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (authenticated) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  const cbSignupSubmitSuccess = () => {
    setBackdropOpen(false);
    navigate(-1);
  };

  const cbSignupSubmitError = () => {
    setBackdropOpen(false);
  };

  const onSubmit = (formData: IFormInput) => {
    setBackdropOpen(true);
    signup(
      formData,
      () => cbSignupSubmitSuccess(),
      () => cbSignupSubmitError()
    );
  };

  return (
    <Page className="sign-up-page" title="Sign Up">
      <Backdrop className="backdrop" open={backdropOpen}>
        <CircularProgress color="secondary" />
      </Backdrop>
      <Avatar className="sign-up-avatar">
        <LockOutlinedIcon />
      </Avatar>
      <h6 className="sign-up-title">Sign Up</h6>
      <form onSubmit={handleSubmit(onSubmit)} className="sign-up-form">
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{
            required: "Name cannot be empty",
            pattern: { value: nameRegex, message: "Name contain only letters" },
          }}
          render={({ field }) =>
            errors.name ? (
              <CustomTextField
                label="Full Name"
                error={true}
                helperText={errors.name.message}
                {...field}
              />
            ) : (
              <CustomTextField label="Full Name" {...field} />
            )
          }
        />
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
        <Controller
          name="passwordConfirm"
          control={control}
          defaultValue=""
          rules={{
            required: "Password confirm cannot be empty",
            minLength: {
              value: 8,
              message: "Password confirm length must greater than 8",
            },
            validate: (value) =>
              value === watch("password") || "Passwords are not match",
          }}
          render={({ field }) =>
            errors.passwordConfirm ? (
              <CustomTextField
                error={true}
                helperText={errors.passwordConfirm.message}
                label="Confirm Password"
                type="password"
                {...field}
              />
            ) : (
              <CustomTextField
                label="Confirm Password"
                type="password"
                {...field}
              />
            )
          }
        />
        <CustomButton type="submit">Sign Up</CustomButton>
      </form>
      {errorMessage && <h3>{errorMessage}</h3>}
    </Page>
  );
};

export default SignupPage;
