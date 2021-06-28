import {
  Backdrop,
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
} from "@material-ui/core";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "react-query";
import api from "../api";
import CustomButton from "../components/CustomButton";
import CustomModal from "../components/CustomModal";
import CustomTextField from "../components/CustomTextField";
import Page from "../components/Page";
import "./DoctorSecurityPage.scss";

interface IFormUpdatePasswordInput {
  passwordCurrent: string;
  password: string;
  passwordConfirm: string;
}

const DoctorSecurityPage: React.FC = () => {
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
  } = useForm<IFormUpdatePasswordInput>();

  const mutationUpdatePassword = useMutation(
    (formData) => {
      return axios.patch(`/users/updatePassword`, formData);
    },
    {
      onSuccess: (data) => {
        setValue("passwordCurrent", "");
        setValue("password", "");
        setValue("passwordConfirm", "");
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

  const onSubmit = (formData: IFormUpdatePasswordInput) => {
    setBackdropOpen(true);
    setModalSuccessOpen(false);
    setModalErrorOpen(false);
    mutationUpdatePassword.mutate(formData as any);
  };

  return (
    <>
      <Page className="" title="Security">
        {modalSuccessOpen && (
          <CustomModal type="success" message="Update password successfully." />
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
        <Box mt={5} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader
              title="Security"
              classes={{
                title: "profile__title",
              }}
            />
            <Divider />
            <CardContent>
              <div className="profile__form--input">
                <Controller
                  name="passwordCurrent"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Current password cannot be empty",
                    minLength: {
                      value: 8,
                      message: "Current password length must greater than 8",
                    },
                  }}
                  render={({ field }) =>
                    errors.passwordCurrent ? (
                      <CustomTextField
                        error={true}
                        helperText={errors.passwordCurrent.message}
                        label="Old Password"
                        type="password"
                        {...field}
                      />
                    ) : (
                      <CustomTextField
                        label="Old Password"
                        type="password"
                        {...field}
                      />
                    )
                  }
                />
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "New password cannot be empty",
                    minLength: {
                      value: 8,
                      message: "New password length must greater than 8",
                    },
                  }}
                  render={({ field }) =>
                    errors.password ? (
                      <CustomTextField
                        error={true}
                        helperText={errors.password.message}
                        label="New Password"
                        type="password"
                        {...field}
                      />
                    ) : (
                      <CustomTextField
                        label="New Password"
                        type="password"
                        {...field}
                      />
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
              </div>
            </CardContent>
            <Divider />
            <div className="profile__form--action">
              <CustomButton type="submit">Save Changes</CustomButton>
            </div>
          </Card>
        </form>
      </Page>
    </>
  );
};

export default DoctorSecurityPage;
