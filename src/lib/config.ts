import DefaultActionElements from "./components/DefaultActionElements";
import DefaultCallbackElement from "./components/DefaultCallbackElement";
import DefaultErrorForm from "./components/DefaultErrorForm";
import DefaultLoginForm from "./components/DefaultLoginForm";
import DefaultUserForm from "./components/DefaultUserForm";
import type { CallbackElement, LoginForm, UserForm, ActionElements, ErrorForm } from "./components/types";

export interface Config {
    openamServer: string; //OpenAM server host, for example http://openam.example.org:8080
    openamContextPath: string; //OpenAM context path, for example /openam
    loginForm: LoginForm; //LoginForm interface implementation
    userForm: UserForm; //UserForm interface implementation
    errorForm: ErrorForm; //ErrorForm interface implementation
    callbackElement: CallbackElement; //CallbackElement interface implementation
    actionElements: ActionElements; //ActionElements interface implementation
    redirectOnSuccessfulLogin: boolean; //redirects user on successful login to the target URL, otherwise shows a profile.
    getOpenAmUrl: () => string; //returns a full OpenAM URL, for example http://openam.example.org:8080/openam
}

const currentConfig: Config = {
    openamServer: import.meta.env.VITE_OPENAM_SERVER ?? "",
    openamContextPath: import.meta.env.VITE_OPENAM_CONTEXT_PATH ?? "/".concat(location.pathname.replace(new RegExp("^/|/$","g"), "").split("/")[0]),
    getOpenAmUrl: () => `${currentConfig.openamServer}${currentConfig.openamContextPath}`,
    loginForm: DefaultLoginForm,
    userForm: DefaultUserForm,
    errorForm: DefaultErrorForm,
    callbackElement: DefaultCallbackElement,
    actionElements: DefaultActionElements,
    redirectOnSuccessfulLogin: false,
}

export const getConfig = (): Config => currentConfig;

export const setConfig = (newConfig: Partial<Config>) => {
    Object.assign(currentConfig, newConfig);
}