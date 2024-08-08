import { Outlet } from "react-router-dom";

const AuthPage = () => {
    return (
        <>
        <h1>Conductor App</h1>
        <Outlet />
        </>
    )
}

export default AuthPage;