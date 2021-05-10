import { AuthUserAction, AuthUserErrorAction } from "./auth";
import { GetLocationAction } from "./location";

export type Action = AuthUserAction | AuthUserErrorAction | GetLocationAction;
