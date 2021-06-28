import Page from "../../components/Page";
import { Avatar, Backdrop, CircularProgress } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import CustomTextField from "../../components/CustomTextField";
import CustomButton from "../../components/CustomButton";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useState } from "react";
import "./ForgotPasswordPage.scss";
import api from "../../api";
import CustomModal from "../../components/CustomModal";
import { useMutation } from "react-query";
import { emailRegex } from "../../helpers/regex";

interface IFormInput {
  email: string;
}

const ForgotPasswordPage = () => {
  const axios = api();
  const [backdropOpen, setBackdropOpen] = useState<boolean>(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState<boolean>(false);
  const [modalErrorOpen, setModalErrorOpen] = useState<boolean>(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const mutationResetPassword = useMutation(
    (formData) => {
      return axios.post(`/users/forgotPassword`, formData);
    },
    {
      onSuccess: (data) => {
        setBackdropOpen(false);
        setModalSuccessOpen(true);
      },
      onError: (error) => {
        console.error(error);
        setBackdropOpen(false);
        setModalErrorOpen(true);
      },
    }
  );

  const onSubmit = (formData: IFormInput) => {
    setBackdropOpen(true);
    setModalSuccessOpen(false);
    setModalErrorOpen(false);
    mutationResetPassword.mutate(formData as any);
  };

  return (
    <Page className="sign-up-page" title="Forgot Password">
      {modalSuccessOpen && (
        <CustomModal
          type="success"
          message="Our instructions is sent to your email. Please check the Trash section"
        />
      )}
      {modalErrorOpen && (
        <CustomModal
          type="error"
          message="Something goes wrong. Please try again!"
        />
      )}
      <Backdrop className="backdrop" open={backdropOpen}>
        <CircularProgress color="secondary" />
      </Backdrop>
      <Avatar className="sign-up-avatar">
        <LockOutlinedIcon />
      </Avatar>
      <h6 className="sign-up-title">Forgot your password?</h6>
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
        <CustomButton type="submit">Send reset instructions</CustomButton>
      </form>
    </Page>
  );
};

export default ForgotPasswordPage;
