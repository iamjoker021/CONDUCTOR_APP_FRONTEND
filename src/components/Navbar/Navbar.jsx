import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";

const Navbar = () => {
  
  const { logout } = useLogout();
    const handleClick = () => {
      logout()
    }

    return (
        <nav>
          <ul>
            <li><Link to="/place-ticket">Place Ticket</Link></li>
            <li><Link to="/tickets">View Tickets</Link></li>
            <li><button type="button" onClick={handleClick}>Log Out</button></li>
          </ul>
        </nav>
    )
}

export default Navbar;