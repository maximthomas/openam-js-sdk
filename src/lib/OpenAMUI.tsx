import { useEffect, useState } from "react";
import type { AuthError, SuccessfulAuth, UserAuthData } from "./types";
import { UserService } from "./userService";
import { LoginService } from "./loginService";
import Login from "./Login";
import { getConfig } from "./config";

const OpenAMUI: React.FC = () => {

    const config = getConfig();
    const loginService = new LoginService(config.getOpenAmUrl());
    const userService = new UserService(config.getOpenAmUrl());

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

    const doRedirect = (url: string) => {
        const absoluteUrlPattern = /^(?:[a-z+]+:)?\/\//i;
        if(absoluteUrlPattern.test(url)) {
            window.location.href = url;
        } else {
            window.location.href = config.openamServer.concat(url)    
        }
    }

    const successfullAuthHandler = async (successfulAuth : SuccessfulAuth) => {
        if(config.redirectOnSuccessfulLogin){
            doRedirect(successfulAuth.successUrl);
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
        if(config.redirectOnSuccessfulLogin) {
            doRedirect(userAuthData.successURL);
            return;
        }
        return <config.userForm userAuthData={userAuthData} userService={userService} />;
    }

    return <Login loginService={loginService} successfulAuthHandler={successfullAuthHandler} errorAuthHandler={errorAuthHandler} />;
};

export default OpenAMUI;