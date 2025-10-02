import { Fragment } from "react";
import type { LoginForm } from "./types";
import { getConfig } from "../config";

const DefaultLoginForm: LoginForm = ({ authData, setCallbackValue, doLogin }) => {

    const config = getConfig();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const submitEvent = e.nativeEvent as SubmitEvent;
        const submitter = submitEvent.submitter;

        if (submitter instanceof HTMLButtonElement || submitter instanceof HTMLInputElement) {
            console.log('Submit button name:', submitter.name);
            doLogin(submitter.value);
            
        } else {
            doLogin('');
        }
        
    }

    return <div>
        <h2>{authData.header}</h2>
        <form onSubmit={handleSubmit}>
            {authData.callbacks.filter((cb) => cb.type !== 'ConfirmationCallback').map((cb, i) => {
                const id = cb.input[0].name;
                return <div key={id} className="form-group">
                    <config.callbackElement callback={cb} setCallbackValue={(val) => setCallbackValue(i, val)} />
                </div>
            })}
            <div className="button-group">
                <config.actionElements callbacks={authData.callbacks} />
            </div>
        </form>
    </div>
}

export default DefaultLoginForm