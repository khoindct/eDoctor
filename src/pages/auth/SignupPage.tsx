import { useNavigate } from "react-router";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { Box, Button, TextField } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";

interface IFormInput {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
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
    signup(formData, () => navigate("/app/dashboard"));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField label="Full Name" {...field} />}
        />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField label="Email Address" {...field} />}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField label="Password" {...field} />}
        />
        <Controller
          name="passwordConfirm"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField label="Confirm Password" {...field} />
          )}
        />

        <Box my={2}>
          <Button
            color="primary"
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Sign Up
          </Button>
        </Box>
      </form>
      {errorMessage && <h3>{errorMessage}</h3>}
    </div>
  );
};

export default SignupPage;
