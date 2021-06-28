import { Avatar, Backdrop, CircularProgress } from "@material-ui/core";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import api from "../../api";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import CustomModal from "../../components/CustomModal";
import Page from "../../components/Page";
import "./ResetPasswordPage.scss";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router";
import CustomTextField from "../../components/CustomTextField";
import CustomButton from "../../components/CustomButton";

interface IFormInput {
  password: string;
  passwordConfirm: string;
}

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const axios = api();
  const [backdropOpen, setBackdropOpen] = useState<boolean>(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState<boolean>(false);
  const [modalErrorOpen, setModalErrorOpen] = useState<boolean>(false);
  const {
    control,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const mutationUpdatePassword = useMutation(
    (formData) => {
      return axios.patch(`/users/resetPassword/${token}`, formData);
    },
    {
      onSuccess: (data) => {
        setValue("password", "");
        setValue("passwordConfirm", "");
        setBackdropOpen(false);
        setModalSuccessOpen(true);
        navigate("/login");
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
    mutationUpdatePassword.mutate(formData as any);
  };

  return (
    <Page className="sign-up-page" title="Update Password">
      {modalSuccessOpen && (
        <CustomModal
          type="success"
          message="Reset password successfully. You are now signed in."
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
      <h6 className="sign-up-title">Create New Password</h6>
      <form onSubmit={handleSubmit(onSubmit)} className="sign-up-form">
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
        <CustomButton type="submit">Reset Password</CustomButton>
      </form>
    </Page>
  );
};

export default ResetPasswordPage;
