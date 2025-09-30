# OpenAM Alternative Frontend SDK

This project is intended to provide an alternative frontend SDK for interacting with Open Identity Platform's OpenAM authentication services. It is built using modern web technologies and aims to simplify the integration process for developers.

## Features
- TypeScript support for type safety and better developer experience.
- React components for easy integration into React applications.
- Modular design for flexibility and customization.


## Installation
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
import { Login } from 'openam-js-sdk';
import 'openam-js-sdk/dist/style.css';
const App = () => {
  return (
    <div>
      <h1>Welcome to OpenAM Authentication</h1>
      <Login />
    </div>
  );
};