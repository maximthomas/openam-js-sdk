import type { AuthData } from "./types";

const OPENAM_URL = "http://openam.example.org:8080/openam/json/realms/root/authenticate";

var loginService = {

    init: async (): Promise<AuthData> => {
        try {
            const response = await fetch(OPENAM_URL, {
                method: "POST",
                mode: "cors",
            })
            return await response.json();
        } catch (e) {
            console.log("fallback to test data")
            return JSON.parse(mockData);
        }
    },

    submitCallbacks: async (authData: AuthData) => {
        try {
            const response = await fetch(OPENAM_URL, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(authData),
            })
            return await response.json();
        } catch (e) {
            console.log("error posting data ", JSON.stringify(authData))            
        }
    }

}

const mockData = `{
  "authId": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvdGsiOiJsa21mODI5dHEzbmhraDNyNmVsbGZtYWpybCIsInJlYWxtIjoiZGM9b3BlbmFtLGRjPW9wZW5pZGVudGl0eXBsYXRmb3JtLGRjPW9yZyIsInNlc3Npb25JZCI6IkFRSUM1d00yTFk0U2ZjekloNTRQLTZ1czRod0tSa09ibWFKa251U0p3SUxNYi1VLipBQUpUU1FBQ01ERUFBbE5MQUJNMk56VTVOVEF5T1RrNU5UUXpOemM0T1RZNEFBSlRNUUFBKiJ9.0lYgF063co7bcg_-xbabvrZponm7NMq3s-IeYPaf9Js",
  "template": "",
  "stage": "DataStore1",
  "header": "Sign in to OpenAM",
  "infoText": [
    "",
    ""
  ],
  "callbacks": [
    {
      "type": "NameCallback",
      "output": [
        {
          "name": "prompt",
          "value": "User Name:"
        }
      ],
      "input": [
        {
          "name": "IDToken1",
          "value": "demo"
        }
      ]
    },
    {
      "type": "PasswordCallback",
      "output": [
        {
          "name": "prompt",
          "value": "Password:"
        }
      ],
      "input": [
        {
          "name": "IDToken2",
          "value": "changeit"
        }
      ]
    }
  ]
}`

export { loginService }
