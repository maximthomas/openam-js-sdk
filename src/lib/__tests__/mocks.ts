import type { AuthData, AuthError, SuccessfulAuth } from "../types"

const authDataJSON = `{
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

const successfulAuthJSON = `{
    "tokenId": "AQIC5wM2LY4SfcwIaAQY6dwlk4xEQjX9v59vw3gRzpGwfTI.*AAJTSQACMDEAAlNLABM2NDI1MzUyMDYwODgwODYyNzkyAAJTMQAA*",
    "successUrl": "/openam/console",
    "realm": "/"
}`


const authErrorJSON = `{"code":401,"reason":"Unauthorized","message":"Authentication Failed"}`

export const mockAuthData = JSON.parse(authDataJSON) as AuthData
export const mockSuccessfulAuth = JSON.parse(successfulAuthJSON) as SuccessfulAuth
export const mockAuthError  = JSON.parse(authDataJSON) as AuthError