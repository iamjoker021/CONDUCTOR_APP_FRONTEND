import { useEffect, useState } from "react";
import { useFetchTicketList } from "../../hooks/useFetchTicketList";

const TicketList = () => {
    const [ticketList, setTicketList] = useState([]);
    const { fetchTicketList, isLoading, error } = useFetchTicketList();

    useEffect(() => {
        fetchTicketList().then(data => setTicketList(data));
    }, [])

    return (
        <div className="tickets">
            {isLoading && <p>Fetching your tikcets</p>}
            {error && <p>error</p>}
            {ticketList.length > 0 &&
                ticketList.map(ticket => 
                    <div key={ticket.ticket_unique_identifier} className="ticket">
                        <p>Ticket ID: {ticket.ticket_unique_identifier}</p>
                        <p>Issue Time: {ticket.issue_time}</p>
                        <p>Expiry Time: {ticket.expiry_time}</p>
                        <p>Ticket QR: {ticket.ticket_qr}</p>
                    </div>
                )
            }
        </div>
    )

}

export default TicketList;