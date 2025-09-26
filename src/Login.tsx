import { useEffect, useState } from "react";
import { LoginService } from "./loginService";
import type { AuthData } from "./types";
import DefaultLoginForm from "./components/DefaultForm";

const loginService = new LoginService();

const Login = () => {
  
  const [authData, setAuthData] = useState<AuthData | null>(null);
  useEffect(() => {
    const initAuth = async () => {
      const ls = await loginService.init()
      setAuthData(ls)
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

  const doLogin = () => {
    if (!authData) {
      return
    }
    loginService.submitCallbacks(authData)
  }

  if (authData) {
    return <DefaultLoginForm authData={authData} setCallbackValue={setCallbackValue} doLogin={doLogin} />
  }
  return <></>
}

export default Login