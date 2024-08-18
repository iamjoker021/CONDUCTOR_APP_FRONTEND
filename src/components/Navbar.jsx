import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { user } = useAuthContext();
  const location = useLocation();
  let currentLink;

  if (location.pathname.includes('/place-ticket') || location.pathname.includes('/scan')){
    currentLink = 'place';
  }
  else if (location.pathname.includes('/tickets')){
    currentLink = 'view';
  }

  return (
    <nav className="navbar">
      {user.role === 'passenger' ?
      <>
      <Link className={'nav-item place' + (currentLink === 'place' ? ' active' : '')} to={`/${user.role}/place-ticket`} >Place Ticket</Link>
      <Link className={'nav-item view' + (currentLink === 'view' ? ' active' : '')} to={`/${user.role}/tickets`} >View Tickets</Link>
      </>
      :
      <>
      <Link className={'nav-item place' + (currentLink === 'place' ? ' active' : '')} to={`/${user.role}/ticket/scan`} >Scan Ticket</Link>
      <Link className={'nav-item view' + (currentLink === 'view' ? ' active' : '')} to={`/${user.role}/tickets/123`} >View Tickets</Link>
      </>
      }
    </nav>
  )
}

export default Navbar;