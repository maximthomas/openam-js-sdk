import { useEffect, useState } from "react";
import type { UserAuthData, UserData } from "./types";
import type { UserService } from "./userService";

interface UserProps {
  userAuthData: UserAuthData;
  userService: UserService;
}

const User: React.FC<UserProps> = ({ userAuthData, userService }) => {

    const [userData, setUserData] = useState<UserData|null>(null);

    const onSave = (data: UserData) => {
        console.log("Saving user data", data);
        // Implement save logic here, e.g., call userService to update user data
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const data = await userService.getUserData(userAuthData.id);
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
    <form
      onSubmit={e => {
        e.preventDefault();
        onSave(userData);
      }}
      style={{ display: "flex", flexDirection: "column", gap: "1em", maxWidth: 500 }}
    >
      <label>
        Username:
        <input
          type="text"
          value={userData.username} readOnly={true}          
        />
      </label>
      <label>
        First Name:
        <input
          type="text"
          value={userData.givenName ? userData.givenName[0] : ""}
          onChange={e => handleChange("givenName", e.target.value)}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          value={userData.sn ? userData.sn[0] : ""}
          onChange={e => handleChange("sn", e.target.value)}
        />
      </label>
      <label>
        Mail:
        <input
          type="email"
          value={userData.mail ? userData.mail[0] : ""}
          onChange={e => handleChange("mail", e.target.value)}
        />
      </label>
      <label>
        Phone number:
        <input
          type="tel"
          value={userData.telephoneNumber ? userData.telephoneNumber[0] : ""}
          onChange={e => handleChange("telephoneNumber", e.target.value)}
        />
      </label>
      
      <input type="submit" value="Save" />
    </form>);
}

export default User;    