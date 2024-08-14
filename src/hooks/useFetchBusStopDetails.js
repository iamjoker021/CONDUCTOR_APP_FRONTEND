import { useState } from "react";
import { useLogout } from "./useLogout";
import { useAuthContext } from "./useAuthContext";

export const useFetchBusStopDetails = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user }  = useAuthContext()
    const { logout } = useLogout()

    const fetchStopsByBusID = async (busId) => {
        setIsLoading(true);
        setError(null);

        try {
            const SERVER_URL = import.meta.env.VITE_BACKEND_SERVER_URL;
            let GET_STOP_DETAILS = "/api/bus-route/bus/";
            const response = await fetch(SERVER_URL+GET_STOP_DETAILS+busId, {headers: { 'Authorization': `Bearer ${user.token}` }})
            const data = await response.json();
            
            if (response.status === 401) {
                logout();
            }
            else if (!response.ok) {
                setError(data.error);
            }
            else {
                return data['busStopsDetails'][0];
            }
        } 
        catch (error) {
            setError(JSON.stringify(error));
        }
        finally {
            setIsLoading(false);
        }
    }

    return { fetchStopsByBusID, isLoading, error };
}