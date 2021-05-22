import { useNavigate } from "react-router";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { Avatar } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import CustomTextField from "../../components/CustomTextField";
import CustomButton from "../../components/CustomButton";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import "./SignupPage.scss";
import Page from "../../components/Page";

interface IFormInput {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  role?: string;
}

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<IFormInput>();
  const { signup } = useActions();
  const { authenticated, errorMessage } = useTypedSelector(
    (state) => state.auth
  );

  const onSubmit = (formData: IFormInput) => {
    console.log(formData);
    signup(formData, () => navigate(-1));
  };

  return (
    <Page className="sign-up-page" title="Sign Up">
      <Avatar className="sign-up-avatar">
        <LockOutlinedIcon />
      </Avatar>
      <h6 className="sign-up-title">Sign Up</h6>
      <form onSubmit={handleSubmit(onSubmit)} className="sign-up-form">
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CustomTextField label="Full Name" {...field} />
          )}
        />
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
            <CustomTextField label="Password" {...field} />
          )}
        />
        <Controller
          name="passwordConfirm"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CustomTextField label="Confirm Password" {...field} />
          )}
        />
        <CustomButton type="submit">Sign Up</CustomButton>
      </form>
      {errorMessage && <h3>{errorMessage}</h3>}
    </Page>
  );
};

export default SignupPage;
