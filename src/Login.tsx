import { act, useEffect, useState } from "react";
import { LoginService } from "./loginService";
import type { AuthData, AuthError, AuthResponse, SuccessfulAuth } from "./types";
import DefaultLoginForm from "./components/DefaultForm";

const loginService = new LoginService();

const Login = () => {

  function isAuthError(response: any): response is AuthError {
    return response && typeof response.code === 'number' && typeof response.message === 'string';
  }

  function isAuthData(response: any): response is AuthData {
    return response && typeof response.authId === 'string' && Array.isArray(response.callbacks);
  }

  function isSuccessfulAuth(response: any): response is SuccessfulAuth {
    return response && typeof response.tokenId === 'string' && typeof response.successUrl === 'string';
  }

  function handleAuthResponse(response: AuthResponse) {
    if (isAuthData(response)) {
      setAuthData(response)
    } else if (isAuthError(response)) {
      //handleAuthError(authResponse);
      console.log("got auth error");
    } else if (isSuccessfulAuth(response)) {
      //  handleSuccessfulAuth(authResponse);
      console.log("successful auth");

    } else {
      console.error("Unknown response format", response);
    }
  }

  const [authData, setAuthData] = useState<AuthData | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      const authResponse = await loginService.init()
      handleAuthResponse(authResponse);
    }
    initAuth();

  }, [])

  const setCallbackValue = (i: number, val: string | number) => {
    if (!authData) {
      return;
    }
    const newAuthData = loginService.setCallbackValue(i, val, authData);
    setAuthData(newAuthData);
  }

  const doLogin = async (action: string) => {
    if (!authData) {
      return
    }

    const newAuthData = loginService.setConfirmationActionValue(action, authData);

    const authResponse = await loginService.submitCallbacks(newAuthData)
    
    handleAuthResponse(authResponse);
  }

  if (authData) {
    return <DefaultLoginForm authData={authData} setCallbackValue={setCallbackValue} doLogin={doLogin} />
  }
  return <></>
}

export default Login