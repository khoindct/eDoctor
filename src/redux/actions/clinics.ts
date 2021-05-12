import { ActionType } from "../action-types";

export interface GetClinicsAction {
  type: ActionType.GET_CLINICS;
}

export interface GetClinicsSuccessAction {
  type: ActionType.GET_CLINICS_SUCCESS;
  payload: any[];
}

export interface GetClinicsErrorAction {
  type: ActionType.GET_CLINICS_ERROR;
  payload: string;
}

export interface CreateClinicAction {
  type: ActionType.CREATE_CLINIC;
}

export interface CreateClinicSuccessAction {
  type: ActionType.CREATE_CLINIC_SUCCESS;
  payload: any[];
}

export interface CreateClinicErrorAction {
  type: ActionType.CREATE_CLINIC_ERROR;
  payload: string;
}
