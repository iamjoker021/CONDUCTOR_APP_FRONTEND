import { useState } from "react";
import { useLogout } from "./useLogout";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useValidateTicket = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user }  = useAuthContext();
    const { logout } = useLogout();
    const navigate = useNavigate();

    const validateTicket = async (url) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(url, {method: 'POST', headers: { 'Authorization': `Bearer ${user.token}` }})
            const data = await response.json();
            
            if (response.status === 401) {
                logout();
            }
            
            else if (!response.ok) {
                if (response.status === 400) {
                    if (data.error === 'The ticket is already validated') {
                        const ticketId = url.split('/').pop();
                        const ticket = data.ticketDetails;
                        navigate('/conductor/tickets/'+ticketId, { state: ticket });
                    }
                    else {
                        const ticketId = url.split('/').pop() | 'ticket-id-error';
                        const ticket = data;
                        ticket.error = data.error;
                        navigate('/conductor/tickets/'+ticketId, { state: ticket });
                    }
                }
                setError(data.msg);
            }
            else {
                const ticketId = url.split('/').pop();
                const ticket = data.ticketDetails;
                navigate('/conductor/tickets/'+ticketId, { state: ticket });
            }
        }
        catch (error) {
            setError(JSON.stringify(error));
        }
        finally {
            setIsLoading(false);
        }
    }

    return { validateTicket, isLoading, error};
}