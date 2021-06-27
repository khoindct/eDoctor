import {
  Backdrop,
  CircularProgress,
  Step,
  StepLabel,
  Stepper,
} from "@material-ui/core";
import { useState } from "react";
import { Control, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import api from "../../api";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import CustomModal from "../CustomModal";
import { IFormInput } from "./controls.model";
import GeneralStep from "./GeneralStep";
import LocationStep from "./LocationStep";
import OpeningHoursStep from "./OpeningHoursStep";
import "./StepForm.scss";

const labels = ["General", "Opening Hours", "Location"];

const StepForm = () => {
  const axios = api();
  const [modalSuccessOpen, setModalSuccessOpen] = useState<boolean>(false);
  const [modalErrorOpen, setModalErrorOpen] = useState<boolean>(false);
  const [backdropOpen, setBackdropOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { location, coordinates } = useTypedSelector(
    (state) => state.locations
  );
  const [activeStep, setActiveStep] = useState(0);
  const {
    register,
    control,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  // Proceed to next step
  const handleNext = () => setActiveStep((prev) => prev + 1);
  // Go back to prev step
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSteps = (step: number, control: Control<IFormInput>) => {
    switch (step) {
      case 0:
        return (
          <GeneralStep
            handleNext={handleNext}
            control={control}
            register={register}
            setValue={setValue}
            errors={errors}
          />
        );
      case 1:
        return (
          <OpeningHoursStep
            handleNext={handleNext}
            handleBack={handleBack}
            control={control}
            register={register}
            setValue={setValue}
            errors={errors}
          />
        );
      case 2:
        return (
          <LocationStep
            handleNext={handleNext}
            handleBack={handleBack}
            control={control}
            register={register}
            errors={errors}
          />
        );
      default:
        break;
    }
  };

  function getFormData(object: any) {
    const formData = new FormData();
    Object.keys(object).forEach((key) => formData.append(key, object[key]));
    return formData;
  }

  const mutationSubmitClinic = useMutation(
    (formData) => {
      return axios.post("/clinics", formData);
    },
    {
      onSuccess: (_) => {
        setBackdropOpen(false);
        setModalSuccessOpen(true);
        navigate("/");
      },
      onError: (error) => {
        console.error(error);
        setBackdropOpen(false);
        setModalErrorOpen(true);
      },
    }
  );

  const onSubmit = async (formData: IFormInput) => {
    setBackdropOpen(true);
    setModalSuccessOpen(false);
    setModalErrorOpen(false);
    formData.address = location;
    formData.geometry = JSON.stringify({
      type: "Point",
      coordinates: [coordinates.lng, coordinates.lat],
    });
    const data = getFormData(formData);
    mutationSubmitClinic.mutate(data as any);
  };

  return (
    <div>
      {modalSuccessOpen && (
        <CustomModal
          type="success"
          message="Your application will be reviewed, we will announce via your email."
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
      <Stepper
        activeStep={activeStep}
        style={{ margin: "30px 0 15px" }}
        alternativeLabel
      >
        {labels.map((label) => (
          <Step key={label}>
            <StepLabel
              classes={{
                label: "step-label-label",
                active: "step-label-label-active",
              }}
              StepIconProps={{
                classes: {
                  root: "step-label-root",
                  text: "step-label-text",
                  active: "step-label-root-active",
                  completed: "step-label-root-completed",
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <form className="clinic-form" onSubmit={handleSubmit(onSubmit)}>
        {handleSteps(activeStep, control)}
      </form>
    </div>
  );
};

export default StepForm;
