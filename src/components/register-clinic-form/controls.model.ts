import {
  Control,
  DeepMap,
  FieldError,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

export interface IFormInput {
  email: string;
  name: string;
  address: string;
  phone: string;
  coverImage: File;
  description: string;
  geometry: string;
  // geometry: {
  //   type: "Point";
  //   coordinates: number[];
  // };

  // Opening hours property
  monday: (number | null)[];
  tuesday: (number | null)[];
  wednesday: (number | null)[];
  thursday: (number | null)[];
  friday: (number | null)[];
  saturday: (number | null)[];
  sunday: (number | null)[];
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

export type IDays =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export interface IFormStep {
  handleNext?: () => void;
  handleBack?: () => void;
  setValue?: UseFormSetValue<IFormInput>;
  errors: DeepMap<IFormInput, FieldError>;
  control: Control<IFormInput>;
  register: UseFormRegister<IFormInput>;
}
