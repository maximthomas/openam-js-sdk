import type React from "react";
import type { AuthData, AuthError, Callback, UserAuthData } from "../types";
import type { UserService } from "../userService";

export type LoginForm = React.FC<{
  authData: AuthData,
  setCallbackValue: (i: number, val: string) => void,
  doLogin: (action: string) => void
}> 

export type CallbackElement = React.FC<{
    callback: Callback
    setCallbackValue: (val: string) => void
}>

export type UserForm = React.FC<{
  userAuthData: UserAuthData;
  userService: UserService;
}>

export type ErrorForm = React.FC<{
    error: AuthError,
    resetError: () => void
}>

export type ActionElements = React.FC<{callbacks: Callback[]}>
