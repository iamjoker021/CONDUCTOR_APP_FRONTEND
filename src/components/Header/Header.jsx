import { useLogout } from "../../hooks/useLogout";
import Navbar from "../Navbar/Navbar";

const Header = () => {
    const { logout } = useLogout();
    const handleClick = () => {
      logout()
    }

    return (
        <header className="padding">
            <div className="userInfo">
                <div>Profile Photo</div>
                <div className="logoutButton">
                    <button className="logout" type="button" onClick={handleClick}>Log Out</button>
                </div>
            </div>
            <Navbar />
        </header>
    )
}

export default Header;