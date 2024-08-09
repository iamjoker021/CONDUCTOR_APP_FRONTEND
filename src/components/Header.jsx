import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import Navbar from "./Navbar";

const Header = () => {

    const { user } = useAuthContext();

    const { logout } = useLogout();
    const handleClick = () => {
      logout()
    }

    return (
        <header className="padding">
            <div className="userInfo">
                <div>{user.username}</div>
                <div className="logoutButton">
                    <button className="logout" type="button" onClick={handleClick}>Log Out</button>
                </div>
            </div>
            <Navbar />
        </header>
    )
}

export default Header;