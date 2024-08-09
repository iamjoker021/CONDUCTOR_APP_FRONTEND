import { useState } from "react";
import { useLogout } from "./useLogout";
import { useAuthContext } from "./useAuthContext";

export const useFetchTicketList = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user }  = useAuthContext()
    const { logout } = useLogout()

    const fetchTicketList = async (isValid=1) => {
        setIsLoading(true);
        setError(null);

        try {
            const SERVER_URL = "http://localhost:3000";
            let GET_TICKET = "/api/user/tickets";
            
            if (isValid) {
                GET_TICKET = GET_TICKET + '?isvalid=1';
            }
            const response = await fetch(SERVER_URL+GET_TICKET, {headers: { 'Authorization': `Bearer ${user.token}` }})
            const data = await response.json();
            
            if (response.status === 401) {
                logout();
            }
            else if (!response.ok) {
                setError(data.msg);
            }
            else {
                return data['ticketList'];
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

    return { fetchTicketList, isLoading, error };
}