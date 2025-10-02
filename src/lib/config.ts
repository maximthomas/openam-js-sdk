import DefaultActionElements from "./components/DefaultActionElements";
import DefaultCallbackElement from "./components/DefaultCallbackElement";
import DefaultErrorForm from "./components/DefaultErrorForm";
import DefaultLoginForm from "./components/DefaultLoginForm";
import DefaultUserForm from "./components/DefaultUserForm";
import type { CallbackElement, LoginForm, UserForm, ActionElements, ErrorForm } from "./components/types";

export interface Config {
    openamServer: string;
    openamContextPath: string;
    getOpenAmUrl(): string;
    loginForm: LoginForm;
    userForm: UserForm;
    errorForm: ErrorForm;
    callbackElement: CallbackElement;
    actionElements: ActionElements;
    redirectOnSuccessfulLogin: boolean;
}

const currentConfig: Config = {
    openamServer: import.meta.env.VITE_OPENAM_SERVER ?? "",
    openamContextPath: import.meta.env.VITE_OPENAM_CONTEXT_PATH ?? "/openam",
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