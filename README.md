# OpenAM Alternative Frontend SDK

This project is intended to provide an alternative frontend SDK for interacting with Open Identity Platform's OpenAM authentication services. It is built using modern web technologies and aims to simplify the integration process for developers.

## Features
- TypeScript support for type safety and better developer experience.
- React components for easy integration into React applications.
- Modular design for flexibility and customization.

## Usage

### As an Application

Clone the source code:

```bash
git clone https://github.com/OpenIdentityPlatform/openam-js-sdk.git
```

```bash
cd openam-js-sdk
npm install
npm run build:app
```

Copy the `dist/app` folder contents to your OpenAM's war file or to extracted war contenst in your web container, for example `extui` so it could be accesible in your OpenAM context path, for example, http://openam.example.org:8080/openam/extui

You can aslo run the application in a standalone server. The only condition, the servers shoud be on the same subdomain, so OpenAM's cookies could be sent from the frontend application.


## As an SDK library
To install the SDK, use npm or yarn:
```bash
npm install openam-js-sdk
# or
yarn add openam-js-sdk
``` 
## Usage
Here's a basic example of how to use the SDK in a React application:

```tsx
import React from 'react';
import OpenAMUI from 'openam-js-sdk';

const App = () => {
  return (
      <OpenAMUI />
  );
};
```

## Customization
You can customize the SDK by providing your own UI components and styles. 

To customize the application behaviour, customise the following settings:

```ts
export interface Config {
    openamServer: string; //OpenAM server host, for example http://openam.example.org:8080
    openamContextPath: string; //OpenAM context path, for example /openam
    loginForm: LoginForm; //LoginForm interface implementation
    userForm: UserForm; //UserForm interface implementation
    errorForm: ErrorForm; //ErrorForm interface implementation
    callbackElement: CallbackElement; //CallbackElement interface implementation
    actionElements: ActionElements; //ActionElements interface implementation
    redirectOnSuccessfulLogin: boolean; //redirects user on successful login to the target URL, otherwise shows a profile.
    getOpenAmUrl(): string; //returns a full OpenAM URL, for example http://openam.example.org:8080/openam
}
```

for example

```tsx
//update the default configuration

setConfig({
  openamServer: 'https://openam.example.org:443',
  openamContextPath: '/am',
  errorForm: ({ error, resetError }) => {
    return <div>
      <h1>An error occurred</h1>
      <p>{error?.message}</p>
      <input type="button" value="Retry" onClick={() => resetError()} />
    </div>
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <OpenAMUI />
  </StrictMode>,
)
```

There are components you can override:

```tsx
// renders a login form with callbacks
export type LoginForm = React.FC<{
  authData: AuthData,
  setCallbackValue: (i: number, val: string) => void,
  doLogin: (action: string) => void
}> 

// renders a callback such as NameCallback, PasswordCallback and so ON
export type CallbackElement = React.FC<{
    callback: Callback
    setCallbackValue: (val: string) => void
}>

// renders a user profile form
export type UserForm = React.FC<{
  userAuthData: UserAuthData;
  userService: UserService;
}>

// renders an authentication error form
export type ErrorForm = React.FC<{
    error: AuthError,
    resetError: () => void
}>

// renders submit buttons, if there are no ConfirmationCallback in the callbacks array, renders the default button
export type ActionElements = React.FC<{callbacks: Callback[]}>
```


## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes. Make sure to follow the coding standards and include tests for any new features.

