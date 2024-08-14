import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { jwtDecode } from 'jwt-decode'
import { useLogout } from "../hooks/useLogout";

const Timer = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const [pendingTime, setPendingTime] = useState();
    useEffect(() => {
        const interval = setInterval(() => {
            if (!user || !user.token) {
                logout();
            }
            const decodedToken = jwtDecode(user.token);
            const pendingTime = decodedToken.exp - Math.floor(Date.now()/1000);
            if (pendingTime > 0) {
                setPendingTime(pendingTime);
            }
            else {
                logout();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [])


    return (
        <div className="timer">
            <p>Session Time-out: <span className={pendingTime > 60 ? 'ticks' : 'ticks alert'}><b>{`${String(Math.floor(pendingTime/60), 2).padStart(2, '0')}:${String(pendingTime%60, 2).padStart(2, 0)}`}</b></span></p>
        </div>
    )
}

export default Timer;