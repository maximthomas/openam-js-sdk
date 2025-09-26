import DefaultActionElements from "./DefaultActionElements";
import DefaultCallbackElement from "./DefaultCallbackElement";
import type { LoginForm } from "./types";

const DefaultLoginForm: LoginForm = ({ authData, setCallbackValue, doLogin }) => {


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>  {
    e.preventDefault();
    const submitEvent = e.nativeEvent as SubmitEvent;
    const submitter = submitEvent.submitter;

    if (submitter instanceof HTMLButtonElement || submitter instanceof HTMLInputElement) {
      console.log('Submit button name:', submitter.name);
      // You can now use submitter.name to conditionally handle actions
    } else {
      console.log('No specific submit button name found or form submitted by pressing Enter.');
    }
    doLogin();
  }

  return <div>
    <h1>Login</h1>
    <form onSubmit={ handleSubmit }>
      {authData.callbacks.map((cb, i) => {
        const id = cb.input[0].name;
        return <DefaultCallbackElement key={id} callback={cb} setCallbackValue={(val) => setCallbackValue(i, val)} />
      })}
       <DefaultActionElements callbacks={authData.callbacks} />
    </form>
  </div>
}

export default DefaultLoginForm