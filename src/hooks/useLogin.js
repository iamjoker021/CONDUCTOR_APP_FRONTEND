import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const { dispatch } = useAuthContext();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const SERVER_URL = "http://localhost:3000";
            const USER_LOGIN = "/api/auth/login";
            const jsonBody = JSON.stringify({ email, password });
            const response = await fetch(SERVER_URL+USER_LOGIN, { method: "POST", headers: { 'Content-type': 'application/json' }, body: jsonBody })
            const data = await response.json();
            
            if (!response.ok) {
                setError(data.error);
            }
            else {
                localStorage.setItem('user', JSON.stringify(data));
                dispatch({type: 'LOGIN', payload: data});
                navigate('/');
            }
        } 
        catch (error) {
            console.log(error);
            setError(JSON.stringify(error));
        }
        finally {
            setIsLoading(false);
        }
    }

    return { login, isLoading, error };
}