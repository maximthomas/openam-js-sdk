import { useEffect, useState } from "react";
import type { SuccessfulAuth, UserAuthData } from "./types";
import { UserService } from "./userService";
import { LoginService } from "./loginService";
import Login from "./Login";
import User from "./User";

const OPENAM_URL = "http://openam.example.org:8080/openam";

const loginService = new LoginService(OPENAM_URL);
const userService = new UserService(OPENAM_URL);

const App = () => {
    const [userAuthData, setUserAuthData] = useState<UserAuthData | null>(null);

    useEffect(() => {
        const initAuth = async () => {
            const userData = await userService.getUserIdFromSession()
            setUserAuthData(userData);
        }
        initAuth();
    }, [])

    const successfullAuthHandler = async (_: SuccessfulAuth) => {
        const userData = await userService.getUserIdFromSession()
        setUserAuthData(userData);
    }

    if (userAuthData && userAuthData.id) {
        return <User userAuthData={userAuthData} userService={userService} />;
    }

    return <Login loginService={loginService} successfulAuthHandler={successfullAuthHandler} />;
};

export default App;