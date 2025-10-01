import DefaultActionElements from "./components/DefaultActionElements";
import DefaultCallbackElement from "./components/DefaultCallbackElement";
import DefaultErrorForm from "./components/DefaultErrorForm";
import DefaultLoginForm from "./components/DefaultLoginForm";
import DefaultUserForm from "./components/DefaultUserForm";
import type { CallbackElement, LoginForm, UserForm, ActionElements, ErrorForm } from "./components/types";

interface Config {
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

const config: Config = {
    openamServer: "http://openam.example.org:8080",
    openamContextPath: "/openam",
    getOpenAmUrl: () => `${config.openamServer}${config.openamContextPath}`,
    loginForm: DefaultLoginForm,
    userForm: DefaultUserForm,
    errorForm: DefaultErrorForm,
    callbackElement: DefaultCallbackElement,
    actionElements: DefaultActionElements,
    redirectOnSuccessfulLogin: false,
}

export default config;