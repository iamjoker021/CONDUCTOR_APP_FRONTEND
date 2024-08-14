import { Link } from "react-router-dom"

const TicketCard = ({ticket}) => {
    return (
        <div key={ticket.ticket_unique_identifier} className="ticket card">
            <div className="qrimage">
                <img src={ticket.ticket_qr} alt="Ticket QR Code" />
            </div>
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