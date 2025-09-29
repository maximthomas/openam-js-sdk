import type { ActionElements } from "./types";

const DefaultActionElements: ActionElements = ({callbacks}) => {
  
    const defaultAction = <input type="submit" value="Log In"/>
    const callbackIdx = callbacks.findIndex((cb) => (cb.type === 'ConfirmationCallback'));
    if (callbackIdx < -1) {
        return defaultAction;
    } 
    const opts = callbacks[callbackIdx].output.find((o) => (o.name === 'options'))?.value;
    if (!Array.isArray(opts)) {
      return defaultAction;
    }
    
    return <>{opts.map((o, i) => <input key={"IDButton"+i} name={"IDButton"+i} type="submit" value={o}/>)}</>;
}

export default DefaultActionElements