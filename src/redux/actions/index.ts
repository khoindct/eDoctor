import { AuthUserAction, AuthUserErrorAction } from "./auth";

export type Action = AuthUserAction | AuthUserErrorAction;
