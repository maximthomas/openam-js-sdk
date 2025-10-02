import type { ErrorForm } from "./types";

const DefaultErrorForm: ErrorForm = ({ error, resetError }) => {
    return <div>
        <h1>An error occurred</h1>
        <p>{error?.message}</p>
        <input type="button" value="Retry" onClick={() => resetError()} />
    </div>
}

export default DefaultErrorForm;