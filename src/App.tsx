import { useEffect, useState } from "react";
import type { AuthError, SuccessfulAuth, UserAuthData } from "./types";
import { UserService } from "./userService";
import { LoginService } from "./loginService";
import Login from "./Login";
import config from "./config";


const loginService = new LoginService(config.openamURL);
const userService = new UserService(config.openamURL);

const App = () => {

    const [userAuthData, setUserAuthData] = useState<UserAuthData | null>(null);

    const [error, setError] = useState<AuthError | null>(null);

    useEffect(() => {
        if (error) {
            return;
        }
        const initAuth = async () => {
            const userData = await userService.getUserIdFromSession()
            setUserAuthData(userData);
        }
        initAuth();
    }, [error])

    const successfullAuthHandler = async (successfulAuth : SuccessfulAuth) => {
        if(config.redirectOnSuccessfulLogin){
            const absoluteUrlPattern = /^(?:[a-z+]+:)?\/\//i;
            if(absoluteUrlPattern.test(successfulAuth.successUrl)) {
                window.location.href = successfulAuth.successUrl;
            } else {
                window.location.href = config.openamURL.concat(successfulAuth.successUrl)    
            }
            return;
        }
        const userData = await userService.getUserIdFromSession()
        setUserAuthData(userData);
    }

    const errorAuthHandler = (authError: AuthError) => {
        setError(authError);
    }
    if(error) {
        return <config.errorForm error={error} resetError={() => setError(null)} />;
    }

    if (userAuthData && userAuthData.id) {
        return <config.userForm userAuthData={userAuthData} userService={userService} />;
    }

    return <Login loginService={loginService} successfulAuthHandler={successfullAuthHandler} errorAuthHandler={errorAuthHandler} />;
};

export default App;