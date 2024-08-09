import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useSignin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const signin = async (name, email, phoneno, password, confirm_password, role) => {
        setIsLoading(true);
        setError(null);

        try {
            const SERVER_URL = "http://localhost:3000";
            const USER_REGISTRATION = "/api/auth/register";
            const jsonBody = JSON.stringify({ name, email, phoneno, password, confirm_password, role });
            const response = await fetch(SERVER_URL+USER_REGISTRATION, { method: "POST", headers: { 'Content-type': 'application/json' }, body: jsonBody })
            const data = await response.json();
            console.log('Sign In Log: ',data);
            
            if (!response.ok) {
                setError(data.msg);
            }
            else {
                navigate('/auth');
            }
        } 
        catch (error) {
            setError(error);
        }
        finally {
            setIsLoading(false);
        }
    }

    return { signin, isLoading, error };
}