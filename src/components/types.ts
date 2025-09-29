import type React from "react";
import type { AuthData, Callback } from "../types";

type LoginForm = React.FC<{
  authData: AuthData,
  setCallbackValue: (i: number, val: string) => void,
  doLogin: (action: string) => void
}> 

type CallbackElement = React.FC<{
    callback: Callback
    setCallbackValue: (val: string) => void
}>

type ActionElements = React.FC<{callbacks: Callback[]}>

export type { LoginForm, CallbackElement, ActionElements }