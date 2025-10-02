import type { UserAuthData, UserData } from "./types";

class UserService {

  //http://openam.example.org:8080/openam/json/users?_action=idFromSession

  //http://openam.example.org:8080/openam/json/realms/root/users/demo

  private userUrlTemplate: string;
  private usersUrl: string;

  constructor(openamUrl: string) {
    this.userUrlTemplate = openamUrl.concat("/json/realms/{realm}/users/{userId}");
    this.usersUrl = openamUrl.concat("/json/users");
  }

  getUserIdFromSession = async (): Promise<UserAuthData | null> => {
    try {
      const response = await fetch(this.usersUrl.concat("?_action=idFromSession"), {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
      })
      if(!response.ok) {
        return null;
      }
      return await response.json();
    } catch (e) {
      console.log("error getting user id from session", e)
      console.log("fallback to demo user")
      return null;
    }
  }

  getUserData = async (userId: string, realm: string): Promise<UserData> => {
    try {
      if (!realm || realm === "" || realm === "/") {
        realm = "root";
      } 
      const userUrl= this.userUrlTemplate.replace("{realm}", realm).replace("{userId}", userId);
      
      const response = await fetch(userUrl, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
      })
      return await response.json();
    } catch (e) {
      console.log("error getting user data", e)
      console.log("fallback to demo user data")
      return JSON.parse(userData);
    }
  }
}


export { UserService }

// const usersSuccessfulResponse = `{
//     "id": "demo",
//     "realm": "/",
//     "dn": "id=demo,ou=user,dc=openam,dc=openidentityplatform,dc=org",
//     "successURL": "/openam/console",
//     "fullLoginURL": "/openam/UI/Login?realm=%2F"
// }`

// const userUnauthorizedResponse = `{"code":401,"reason":"Unauthorized","message":"Access Denied"}`

const userData = `{
    "username": "demo",
    "realm": "/",
    "uid": [
        "demo"
    ],
    "universalid": [
        "id=demo,ou=user,dc=openam,dc=openidentityplatform,dc=org"
    ],
    "oath2faEnabled": [
        "1"
    ],
    "objectClass": [
        "iplanet-am-managed-person",
        "inetuser",
        "sunFederationManagerDataStore",
        "sunFMSAML2NameIdentifier",
        "devicePrintProfilesContainer",
        "inetorgperson",
        "sunIdentityServerLibertyPPService",
        "iPlanetPreferences",
        "pushDeviceProfilesContainer",
        "iplanet-am-user-service",
        "forgerock-am-dashboard-service",
        "organizationalperson",
        "top",
        "kbaInfoContainer",
        "sunAMAuthAccountLockout",
        "person",
        "oathDeviceProfilesContainer",
        "iplanet-am-auth-configuration-service"
    ],
    "inetUserStatus": [
        "Active"
    ],
    "dn": [
        "uid=demo,ou=people,dc=openam,dc=openidentityplatform,dc=org"
    ],
    "sn": [
        "demo"
    ],
    "cn": [
        "demo"
    ],
    "createTimestamp": [
        "20250805142017Z"
    ],
    "modifyTimestamp": [
        "20250925124445Z"
    ],
    "roles": [
        "ui-self-service-user"
    ]
}`
