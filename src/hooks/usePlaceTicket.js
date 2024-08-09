import { useState } from "react";
import { useLogout } from "./useLogout";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const usePlaceTicket = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user }  = useAuthContext()
    const { logout } = useLogout()

    const navigate = useNavigate();

    const placeTicket = async (sourceId, destinationId, busId, noOfPassengers) => {
        setIsLoading(true);
        setError(null);

        try {
            const SERVER_URL = "http://localhost:3000";
            let PLACE_TICKET = "/api/user/pay-for-trip";

            const jsonBody = JSON.stringify({sourceId, destinationId, busId, noOfPassengers})
            const response = await fetch(SERVER_URL+PLACE_TICKET, {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${user.token}` ,
                    'Content-type': 'application/json' 
                },
                body: jsonBody
            })
            const data = await response.json();
            console.log(data);
            
            if (response.status === 401) {
                logout();
            }
            else if (!response.ok) {
                setError(data.msg);
            }
            else {
                navigate('/tickets');
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

    return { placeTicket, isLoading, error };
}