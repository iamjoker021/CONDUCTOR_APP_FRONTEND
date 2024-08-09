import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [currentLink, setCurrentLink] = useState('place');
  const handleClick = (e) => {
    const classContains = (value) => Array(...e.target.classList).includes(value);
    if (classContains('view')) {
      setCurrentLink('view');
    }
    else if (classContains('place')) {
      setCurrentLink('place');
    }
    e.preventDefault();
  }

  return (
      <nav onClick={handleClick} className="navbar">
          <Link className={'nav-item place' + (currentLink === 'place' ? ' active' : '')} to="/place-ticket">Place Ticket</Link>
          <Link className={'nav-item view' + (currentLink === 'view' ? ' active' : '')} to="/tickets">View Tickets</Link>
      </nav>
  )
}

export default Navbar;