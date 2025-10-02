import type React from "react";
import type { AuthData, AuthError, Callback, UserAuthData } from '../types';
import type { UserService } from '../userService';


// renders a login form with callbacks
export type LoginForm = React.FC<{
  authData: AuthData,
  setCallbackValue: (i: number, val: string) => void,
  doLogin: (action: string) => void
}> 

// renders a callback such as NameCallback, PasswordCallback and so ON
export type CallbackElement = React.FC<{
    callback: Callback
    setCallbackValue: (val: string) => void
}>

// renders a user profile form
export type UserForm = React.FC<{
  userAuthData: UserAuthData;
  userService: UserService;
}>

// renders an authentication error form
export type ErrorForm = React.FC<{
    error: AuthError,
    resetError: () => void
}>

// renders submit buttons, if there are no ConfirmationCallback in the callbacks array, renders the default button
export type ActionElements = React.FC<{callbacks: Callback[]}>
