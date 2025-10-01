import { Fragment } from "react";
import config from "../config";
import type { LoginForm } from "./types";

const DefaultLoginForm: LoginForm = ({ authData, setCallbackValue, doLogin }) => {


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const submitEvent = e.nativeEvent as SubmitEvent;
        const submitter = submitEvent.submitter;

        if (submitter instanceof HTMLButtonElement || submitter instanceof HTMLInputElement) {
            console.log('Submit button name:', submitter.name);
            doLogin(submitter.value);
        } else {
            console.log('No specific submit button name found or form submitted by pressing Enter.');
        }
    }

    return <div>
        <h1>{authData.header}</h1>
        <form onSubmit={handleSubmit}>
            {authData.callbacks.filter((cb) => cb.type !== 'ConfirmationCallback').map((cb, i) => {
                const id = cb.input[0].name;
                return <Fragment key={id}><config.callbackElement callback={cb} setCallbackValue={(val) => setCallbackValue(i, val)} /><br /></Fragment>
            })}
            <config.actionElements callbacks={authData.callbacks} />
        </form>
    </div>
}

export default DefaultLoginForm