import { Link } from "react-router-dom";

const Navbar = () => {
  return (
      <nav>
        <ul>
          <li><Link to="/place-ticket">Place Ticket</Link></li>
          <li><Link to="/tickets">View Tickets</Link></li>
        </ul>
      </nav>
  )
}

export default Navbar;