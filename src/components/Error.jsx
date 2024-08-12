import { useRouteError } from "react-router-dom";

const Error = () => {
    const error = useRouteError();

    return (
        <>
        <h1>Oops, something is wrong</h1>
        {error &&
        <>
            <p>Status: {error.status}</p>
            <p>Message: {error.message}</p>
        </>
        }
        </>
    )
}

export default Error