import { Link } from "react-router-dom"
import QRTicket from "./QRTicket"

const TicketCard = ({ticket}) => {
    const SERVER_URL = import.meta.env.VITE_BACKEND_SERVER_URL;
    const TICKET_URL = '/api/tickets/';
    return (
        <div key={ticket.ticket_unique_identifier} className="ticket card">
            <QRTicket url={SERVER_URL+TICKET_URL+ticket.ticket_unique_identifier} />
            <div className="qrinfo">
                <p>Issue Time: {new Date(ticket.issue_time).toLocaleString()}</p>
                <p>Expiry Time: {new Date(ticket.expiry_time).toLocaleString()}</p>
                <p>Status: <span className={'ticket-status ' + (new Date() >= new Date(ticket.expiry_time) ? 'expired' : 'valid')}>{new Date() >= new Date(ticket.expiry_time) ? 'Expired' : 'Valid'}</span></p>
                <Link to={ticket.ticket_unique_identifier} state={ticket}>Click here More Info</Link>
            </div>
        </div>
    )

}

export default TicketCard