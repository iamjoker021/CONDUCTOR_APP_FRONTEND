import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect } from "react";

const AuthPage = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (user){
        navigate('/');
        }
    }, []);

    return (
        <>
        <h1>Conductor App</h1>
        <Outlet />
        </>
    )
}

export default AuthPage;