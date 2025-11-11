import { useEffect, type JSX } from "react";
import type { Callback } from "../types";
import type { CallbackElement } from "./types";

const scriptElement = (scriptText: string) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.innerHTML = scriptText;
        document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return null; // This component renders nothing in the DOM
}

const DefaultCallbackElement: CallbackElement = ({ callback, setCallbackValue }) => {

    let inputId;
    if (callback.input) {
        inputId = callback.input[0].name;
    }

    const renderTextOutputCallback = (callback: Callback) => {
        const propMap = Object.fromEntries(callback.output.map((o) => [o.name, o.value]))
        const messageType = propMap['messageType']
        const message = propMap['message'] as string
        switch (messageType) {
            case "0":
            case "1":
            case "2":
                return <p>{message}</p>
            case "4":
                return scriptElement(message);
            default:
                console.log(`unknown message type: ${messageType}`)
                return <></>;
        }
    }

    switch (callback.type) {
        case "NameCallback":
            return <input id={inputId} placeholder={callback.output[0].value as string}
                onChange={(e) => setCallbackValue(e.target.value)} type="text" name={inputId}
                value={callback.input[0].value} required={true} />
        case "PasswordCallback":
            return <input id={inputId} placeholder={callback.output[0].value as string}
                onChange={(e) => setCallbackValue(e.target.value)} type="password" name={inputId}
                value={callback.input[0].value} required={true} />
        case "TextOutputCallback":
            return renderTextOutputCallback(callback)
        default:
            return null
    }
}



export default DefaultCallbackElement;