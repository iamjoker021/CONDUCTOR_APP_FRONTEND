import { useEffect, useState } from "react";
import { useFetchTicketList } from "../hooks/useFetchTicketList";
import TicketCard from "./TicketCard";

const TicketList = () => {
    const [ticketList, setTicketList] = useState([]);
    const { fetchTicketList, isLoading, error } = useFetchTicketList();

    useEffect(() => {
        fetchTicketList().then(data => setTicketList(data));
    }, [])

    return (
        <div className="tickets container">
            <h2>Your tickets</h2>
            {isLoading && <p>Fetching your tikcets</p>}
            {error && <p>error</p>}
            {ticketList.length > 0 && ticketList.map(ticket => 
                <TicketCard key={ticket.ticket_unique_identifier} ticket={ticket} />)
            }
            {(!isLoading && ticketList.length === 0) && <p className="card">No tikcets available</p>}
        </div>
    )

}

export default TicketList;