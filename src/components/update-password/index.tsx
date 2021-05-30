import {
  Backdrop,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
} from "@material-ui/core";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useActions } from "../../hooks/useActions";
import CustomModal from "../CustomModal";
import CustomTextField from "../CustomTextField";
import "./index.scss";

interface IChangePasswordInput {
  passwordCurrent: string;
  password: string;
  passwordConfirm: string;
}

const UpdatePassword: React.FC = () => {
  const [modalSuccessOpen, setModalSuccessOpen] = useState<boolean>(false);
  const [modalErrorOpen, setModalErrorOpen] = useState<boolean>(false);
  const [backdropOpen, setBackdropOpen] = useState<boolean>(false);
  const { control, handleSubmit } = useForm<IChangePasswordInput>();
  const { updatePassword } = useActions();

  const cbUpdatePasswordSuccess = () => {
    setBackdropOpen(false);
    setModalErrorOpen(false);
    setModalSuccessOpen(true);
  };

  const cbUpdatePasswordError = () => {
    setBackdropOpen(false);
    setModalErrorOpen(true);
    setModalSuccessOpen(false);
  };

  const onSubmit = (formData: IChangePasswordInput) => {
    setBackdropOpen(true);
    updatePassword(
      formData,
      () => cbUpdatePasswordSuccess(),
      () => cbUpdatePasswordError()
    );
  };
  console.log(modalSuccessOpen);
  console.log(modalErrorOpen);

  return (
    <>
      {modalSuccessOpen && (
        <CustomModal type="success" message="Successfully save changes" />
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
                render={({ field }) => (
                  <CustomTextField
                    label="Old Password"
                    type="password"
                    {...field}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <CustomTextField
                    label="New Password"
                    type="password"
                    {...field}
                  />
                )}
              />
              <Controller
                name="passwordConfirm"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <CustomTextField
                    label="Confirm Password"
                    type="password"
                    {...field}
                  />
                )}
              />
            </div>
          </CardContent>
          <Divider />
          <div className="profile__form--action">
            <Button
              className="profile__button"
              type="submit"
              size="medium"
              color="primary"
              variant="contained"
            >
              Save Changes
            </Button>
          </div>
        </Card>
      </form>
    </>
  );
};

export default UpdatePassword;
