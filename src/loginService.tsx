import type { AuthData } from "./types";

const OPENAM_URL = "http://openam.example.org:8080/openam/json/realms/root/authenticate";

class LoginService {

  async init(): Promise<AuthData> {
    try {
      const response = await fetch(OPENAM_URL, {
        method: "POST",
        mode: "cors",
      })
      return await response.json();
    } catch (e) {
      console.log("fallback to test data", e)
      return JSON.parse(mockData);
    }
  }

  async submitCallbacks(authData: AuthData) {
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
      console.log("error posting data", e, JSON.stringify(authData))
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

const otpMockData = `
{
    "authId": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdXRoSW5kZXhWYWx1ZSI6Im9hdXRoIiwib3RrIjoicHU0cTU0ZnQwaWI5ZnFhaTFhYnJ0YjBpNmQiLCJhdXRoSW5kZXhUeXBlIjoic2VydmljZSIsInJlYWxtIjoiZGM9b3BlbmFtLGRjPW9wZW5pZGVudGl0eXBsYXRmb3JtLGRjPW9yZyIsInNlc3Npb25JZCI6IkFRSUM1d00yTFk0U2ZjeWZEd1plMFBmNWdvT3ZsSDJQUzBxN3ZiR2dOaWhpRVRJLipBQUpUU1FBQ01ERUFBbE5MQUJNeU5URTBOamN5TXprMk1UazBNakkwTkRJNEFBSlRNUUFBKiJ9.h9x_WoueTZpZlYJIDKPflUgtWuAD7br0NabUgaY0t2I",
    "template": "",
    "stage": "AuthenticatorOATH2",
    "header": "Authenticator (OATH)",
    "infoText": [],
    "callbacks": [
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
                    "name": "IDToken1",
                    "value": 0
                }
            ]
        }
    ]
}`

const otpSubmitted = `{
  "authId": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdXRoSW5kZXhWYWx1ZSI6Im9hdXRoIiwib3RrIjoicHU0cTU0ZnQwaWI5ZnFhaTFhYnJ0YjBpNmQiLCJhdXRoSW5kZXhUeXBlIjoic2VydmljZSIsInJlYWxtIjoiZGM9b3BlbmFtLGRjPW9wZW5pZGVudGl0eXBsYXRmb3JtLGRjPW9yZyIsInNlc3Npb25JZCI6IkFRSUM1d00yTFk0U2ZjeWZEd1plMFBmNWdvT3ZsSDJQUzBxN3ZiR2dOaWhpRVRJLipBQUpUU1FBQ01ERUFBbE5MQUJNeU5URTBOamN5TXprMk1UazBNakkwTkRJNEFBSlRNUUFBKiJ9.h9x_WoueTZpZlYJIDKPflUgtWuAD7br0NabUgaY0t2I",
  "template": "",
  "stage": "AuthenticatorOATH2",
  "header": "Authenticator (OATH)",
  "infoText": [],
  "callbacks": [
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
          "name": "IDToken1",
          "value": "1"
        }
      ]
    }
  ]
}`

export { LoginService }
