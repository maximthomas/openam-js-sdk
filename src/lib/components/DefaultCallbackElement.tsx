import type { CallbackElement } from "./types";

const DefaultCallbackElement: CallbackElement = ({callback, setCallbackValue}) => {
    
    const id = callback.input[0].name;
    switch (callback.type) {
        case "NameCallback":       
            return <input id={id} placeholder={callback.output[0].value as string} 
                onChange={(e) => setCallbackValue(e.target.value)} type="text" name={id} 
                value={callback.input[0].value} required={true} />     
        case "PasswordCallback":
            return <input id={id} placeholder={callback.output[0].value as string} 
                onChange={(e) => setCallbackValue(e.target.value)} type="password" name={id} 
                value={callback.input[0].value} required={true} />     
        default:
            return null
    }
    
}
    
export default DefaultCallbackElement;