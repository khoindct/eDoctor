import { useNavigate } from "react-router-dom";
import Page from "../../components/Page";
import { useActions } from "../../hooks/useActions";
import { Avatar, Backdrop, CircularProgress } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import CustomTextField from "../../components/CustomTextField";
import CustomButton from "../../components/CustomButton";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import "./LoginPage.scss";
import { useEffect, useState } from "react";

interface IFormInput {
  email: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [backdropOpen, setBackdropOpen] = useState<boolean>(false);
  const { control, handleSubmit } = useForm<IFormInput>();
  const { signin } = useActions();
  const { authenticated, errorMessage } = useTypedSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (authenticated) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  const cbLoginSubmit = () => {
    setBackdropOpen(false);
    navigate(-1);
  };

  const onSubmit = (formData: IFormInput) => {
    setBackdropOpen(true);
    signin(formData, () => cbLoginSubmit());
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
          render={({ field }) => (
            <CustomTextField label="Email Address" {...field} />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CustomTextField label="Password" type="password" {...field} />
          )}
        />
        <CustomButton type="submit">Sign In</CustomButton>
      </form>
      {errorMessage && <h3>{errorMessage}</h3>}
    </Page>
  );
};

export default LoginPage;
