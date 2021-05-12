import { AuthUserAction, AuthUserErrorAction } from "./auth";
import {
  CreateClinicAction,
  CreateClinicErrorAction,
  CreateClinicSuccessAction,
  GetClinicsAction,
  GetClinicsErrorAction,
  GetClinicsSuccessAction,
} from "./clinics";
import { GetLocationAction } from "./location";

export type Action =
  | AuthUserAction
  | AuthUserErrorAction
  | GetLocationAction
  | GetClinicsAction
  | GetClinicsSuccessAction
  | GetClinicsErrorAction
  | CreateClinicAction
  | CreateClinicSuccessAction
  | CreateClinicErrorAction;
