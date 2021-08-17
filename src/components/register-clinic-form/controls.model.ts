import {
  Control,
  DeepMap,
  FieldError,
  UseFormGetValues,
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
  specialists: string;
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
  getValues?: UseFormGetValues<IFormInput>;
  setValue?: UseFormSetValue<IFormInput>;
  errors: DeepMap<IFormInput, FieldError>;
  control: Control<IFormInput>;
  register: UseFormRegister<IFormInput>;
}

export const days: IDays[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
