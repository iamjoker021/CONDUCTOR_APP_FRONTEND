import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  let currentLink;

  if (location.pathname.includes('/place-ticket')){
    currentLink = 'place';
  }
  else if (location.pathname.includes('/tickets')){
    currentLink = 'view';
  }

  return (
    <nav className="navbar">
      <Link className={'nav-item place' + (currentLink === 'place' ? ' active' : '')} to={"/passenger/place-ticket"} >Place Ticket</Link>
      <Link className={'nav-item view' + (currentLink === 'view' ? ' active' : '')} to={"/passenger/tickets"} >View Tickets</Link>
    </nav>
  )
}

export default Navbar;