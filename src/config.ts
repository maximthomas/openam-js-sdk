import DefaultActionElements from "./components/DefaultActionElements";
import DefaultCallbackElement from "./components/DefaultCallbackElement";
import DefaultErrorForm from "./components/DefaultErrorForm";
import DefaultLoginForm from "./components/DefaultLoginForm";
import DefaultUserForm from "./components/DefaultUserForm";
import type { CallbackElement, LoginForm, UserForm, ActionElements, ErrorForm } from "./components/types";

interface Config {
    openamURL: string;
    loginForm: LoginForm;
    userForm: UserForm;
    errorForm: ErrorForm;
    callbackElement: CallbackElement;
    actionElements: ActionElements;
    redirectOnSuccessfulLogin: boolean;
}

const config: Config = {
    openamURL: "http://openam.example.org:8080/openam",
    loginForm: DefaultLoginForm,
    userForm: DefaultUserForm,
    errorForm: DefaultErrorForm,
    callbackElement: DefaultCallbackElement,
    actionElements: DefaultActionElements,
    redirectOnSuccessfulLogin: true
}

export default config;