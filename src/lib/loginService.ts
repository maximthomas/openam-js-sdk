import type { AuthData, AuthResponse } from "./types";

class LoginService {

  private authURL: string;

  constructor(openamUrl: string) {
    this.authURL = openamUrl.concat("/json/realms/root/authenticate");
  }
  
  async init(): Promise<AuthResponse> {
    try {
      const response = await fetch(this.authURL, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
      })
      return await response.json();
      
    } catch (e) {
      console.log("fallback to test data", e)
      return JSON.parse(mockData) as AuthResponse;
    }
  }

  async submitCallbacks(authData: AuthData): Promise<AuthResponse> {
    try {
      const response = await fetch(this.authURL, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(authData),
      })
      return await response.json();
    } catch (e) {
      console.log("error posting data", e, JSON.stringify(authData))
      console.log("fallback to test data", e)
      return JSON.parse(successfulAuth) as AuthResponse;
    }
  }

  setCallbackValue(index: number, value: string | number, authData: AuthData): AuthData {

    return {
      ...authData,
      callbacks: authData.callbacks.map((cb, cbIdx) =>
        index === cbIdx ?
          {
            ...cb,
            input: cb.input.map((input, inpIdx) =>
              inpIdx === 0 ? { ...input, value: value } : input
            ),
          }
          : cb
      )
    };
  }

  setConfirmationActionValue(action: string, authData: AuthData): AuthData {
    const callbacks = authData.callbacks;
    const callbackIdx = callbacks.findIndex((cb) => (cb.type === 'ConfirmationCallback'));
    if(callbackIdx < 0) {
      return authData;
    }
    const opts = callbacks[callbackIdx].output.find((o) => (o.name === 'options'))?.value as string[];
    if (!Array.isArray(opts)) {
      return authData;
    }

    const actionIdx = opts.findIndex((val) => val === action);
    if(actionIdx < 0) {
      return authData;
    }
    return this.setCallbackValue(callbackIdx, actionIdx, authData);
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
    },
    {
      "type": "ConfirmationCallback",
      "output": [
        {
          "name": "prompt",
          "value": ""
        },
        {
          "name": "messageType",
          "value": 0
        },
        {
          "name": "options",
          "value": [
            "Register device",
            "Skip this step"
          ]
        },
        {
          "name": "optionType",
          "value": -1
        },
        {
          "name": "defaultOption",
          "value": 0
        }
      ],
      "input": [
        {
          "name": "IDToken3",
          "value": "1"
        }
      ]
    }
  ]
}`

const successfulAuth = `{
    "tokenId": "AQIC5wM2LY4SfcwIaAQY6dwlk4xEQjX9v59vw3gRzpGwfTI.*AAJTSQACMDEAAlNLABM2NDI1MzUyMDYwODgwODYyNzkyAAJTMQAA*",
    "successUrl": "/openam/console",
    "realm": "/"
}`

//const authError = `{"code":401,"reason":"Unauthorized","message":"Authentication Failed"}`


export { LoginService }
