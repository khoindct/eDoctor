import { Step, StepLabel, Stepper } from "@material-ui/core";
import { useState } from "react";
import { Control, useForm } from "react-hook-form";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IFormInput } from "./controls.model";
import GeneralStep from "./GeneralStep";
import LocationStep from "./LocationStep";
import OpeningHoursStep from "./OpeningHoursStep";
import "./StepForm.scss";

const labels = ["General", "Opening Hours", "Location"];

const StepForm = () => {
  const { location, coordinates } = useTypedSelector(
    (state) => state.locations
  );
  const [activeStep, setActiveStep] = useState(0);
  const { register, control, setValue, handleSubmit } = useForm<IFormInput>();

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
          />
        );
      case 2:
        return (
          <LocationStep
            handleNext={handleNext}
            handleBack={handleBack}
            control={control}
            register={register}
          />
        );
      default:
        break;
    }
  };

  const onSubmit = (formData: IFormInput) => {
    formData.address = location;
    formData.geometry = {
      type: "Point",
      coordinates: [coordinates.lng, coordinates.lat],
    };

    console.log(formData);
  };

  return (
    <div>
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
