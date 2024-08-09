import { useLogout } from "../../hooks/useLogout";

const Navbar = () => {
  
  const { logout } = useLogout();
    const handleClick = () => {
      logout()
    }

    return (
        <nav>
          <ul>
            <li>Place Ticket</li>
            <li>View Ticket</li>
            <li><button type="button" onClick={handleClick}>Log Out</button></li>
          </ul>
        </nav>
    )
}

export default Navbar;