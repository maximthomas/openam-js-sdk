import { StrictMode, useEffect, useState, type FormEvent } from 'react'
import { createRoot } from 'react-dom/client'
import { loginService } from './loginService.tsx'
import './index.css'
import type { AuthData, Callback } from './types.ts'
import React from 'react'

const LoginPage: React.FC<{
  authData: AuthData,
  setCallbackValue: (i: number, val: string) => void,
  doLogin: (action: string) => void
}> = ({ authData, setCallbackValue, doLogin }) => {

  const getSubmitButtons = (callbacks: Callback[]) => {

    return <>
      <input type='submit' name='log in' />
    </>
  }

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
    doLogin("");
  }

  return <div>
    <h1>Login</h1>
    <form onSubmit={ handleSubmit }>
      {authData.callbacks.map((cb, i) => {
        const id = cb.input[0].name;
        const type = cb.type == 'NameCallback' ? "text" : "password";
        return <input id={id} key={id} placeholder={cb.output[0].value} onChange={(e) => setCallbackValue(i, e.target.value)} type={type} value={cb.input[0].value} />
      })}
      {getSubmitButtons(authData.callbacks)}
    </form>
  </div>
}

const Login = () => {
  const [authData, setAuthData] = useState<AuthData | null>(null);
  useEffect(() => {
    const initAuth = async () => {
      const ls = await loginService.init()
      setAuthData(ls)
    }
    initAuth();

  }, [])

  const setCallbackValue = (i: number, val: string) => {
    if (!authData) {
      return;
    }
    const newAuthData: AuthData = {
      ...authData,
      callbacks: authData.callbacks.map((cb, cbIdx) =>
        i === cbIdx ?
          {
            ...cb,
            input: cb.input.map((input, inpIdx) =>
              inpIdx === 0 ? { ...input, value: val } : input
            ),
          }
          : cb
      )
    }
    setAuthData(newAuthData);
  }

  const doLogin = (action: string) => {
    if (!authData) {
      return
    }
    loginService.submitCallbacks(authData)
  }

  if (authData) {
    return <LoginPage authData={authData} setCallbackValue={setCallbackValue} doLogin={doLogin} />
  }
  return <></>
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Login />
  </StrictMode>,
)

