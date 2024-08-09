import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect } from "react";

const AuthPage = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (user){
        navigate('/');
        }
    }, []);

    return <Outlet />
}

export default AuthPage;