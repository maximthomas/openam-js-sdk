import { useEffect, useState } from "react";
import type { UserData } from "../types";
import type { UserForm } from "./types";

const DefaultUserForm: UserForm = ({ userAuthData, userService }) => {

    const [userData, setUserData] = useState<UserData | null>(null);

    const onSave = async () => {
        if (!userData) {
            return;
        }
        const data = await userService.saveUserData(userAuthData.id, userAuthData.realm, userData);
        setUserData(data);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const data = await userService.getUserData(userAuthData.id, userAuthData.realm);
            setUserData(data);
        }
        fetchUserData();
    }, [])

    if (!userData) {
        return <div>Loading user data...</div>;
    }

    //return // Helper to handle string/array fields
    const handleChange = (key: keyof UserData, value: string) => {
        setUserData({ ...userData, [key]: [value] });
    };

    return (
        <>
        <h2>User Profile</h2>
        <form
            onSubmit={e => {
                e.preventDefault();
                onSave();
            }}>
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input id="username"
                    name="username"
                    type="text"
                    value={userData.username} readOnly={true}
                />
            </div>
            <div className="form-group">
                <label htmlFor="givenName">First Name:</label>
                <input id="givenName"
                    name="givenName"
                    type="text"
                    value={userData.givenName ? userData.givenName[0] : ""}
                    onChange={e => handleChange("givenName", e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="sn">Last Name:</label>
                <input id="sn"
                    name="sn"
                    type="text"
                    value={userData.sn ? userData.sn[0] : ""}
                    onChange={e => handleChange("sn", e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="mail">Mail:</label>
                <input id="mail"
                    name="mail"
                    type="email"
                    value={userData.mail ? userData.mail[0] : ""}
                    onChange={e => handleChange("mail", e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="telephoneNumber">Phone number:</label>
                <input id="telephoneNumber"
                    name="telephoneNumber"
                    type="tel"
                    value={userData.telephoneNumber ? userData.telephoneNumber[0] : ""}
                    onChange={e => handleChange("telephoneNumber", e.target.value)}
                />
            </div>
            <div className="button-group">
                <input className="primary-button" type="submit" value="Save" />
            </div>
        </form></>);
}

export default DefaultUserForm;    