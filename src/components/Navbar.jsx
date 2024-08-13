import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  let currentLink;
  switch (location.pathname) {
    case '/place-ticket':
      currentLink = 'place';
      break;
    case '/tickets':
      currentLink = 'view';
      break;
    default:
      break;
  }

  return (
      <nav className="navbar">
          <Link className={'nav-item place' + (currentLink === 'place' ? ' active' : '')} to="/place-ticket">Place Ticket</Link>
          <Link className={'nav-item view' + (currentLink === 'view' ? ' active' : '')} to="/tickets">View Tickets</Link>
      </nav>
  )
}

export default Navbar;