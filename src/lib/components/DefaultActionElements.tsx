import type { ActionElements } from "./types";

const DefaultActionElements: ActionElements = ({ callbacks }) => {

    const defaultAction = <input type="submit" className="primary-button" value="Log In" name="IDButton" />
    const callbackIdx = callbacks.findIndex((cb) => (cb.type === 'ConfirmationCallback'));
    if (callbackIdx < 0) {
        return defaultAction;
    }
    const opts = callbacks[callbackIdx].output.find((o) => (o.name === 'options'))?.value;
    if (!Array.isArray(opts)) {
        return defaultAction;
    }

    return <>{opts.map((o, i) =>
        <input className={i == 0 ? "primary-button" : "secondary-button"} key={"IDButton" + i}
            name={"IDButton" + i} type="submit" value={o} />)}
    </>;
}

export default DefaultActionElements