import { Control, UseFormRegister, UseFormSetValue } from "react-hook-form";

export interface IFormInput {
  email: string;
  name: string;
  address: string;
  phone: string;
  coverImage: FileList;
  description: string;
  geometry: {
    type: "Point";
    coordinates: number[];
  };

  // Opening hours property
  startTimeMonday: Date;
  endTimeMonday: Date;

  startTimeTuesday: Date;
  endTimeTuesday: Date;

  startTimeWednesday: Date;
  endTimeWednesday: Date;

  startTimeThursday: Date;
  endTimeThursday: Date;

  startTimeFriday: Date;
  endTimeFriday: Date;

  startTimeSaturday: Date;
  endTimeSaturday: Date;

  startTimeSunday: Date;
  endTimeSunday: Date;
}

export interface IFormStep {
  handleNext?: () => void;
  handleBack?: () => void;
  setValue?: UseFormSetValue<IFormInput>;
  control: Control<IFormInput>;
  register: UseFormRegister<IFormInput>;
}
