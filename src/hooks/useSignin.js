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
            
            if (!response.ok) {
                setError(data.error);
            }
            else {
                navigate('/auth');
            }
        } 
        catch (error) {
            setError(`Unexpectded error. Error: ${JSON.stringify(error)}`);
        }
        finally {
            setIsLoading(false);
        }
    }

    return { signin, isLoading, error };
}