import React from 'react';
import { useLocation } from 'react-router-dom';
import QRTicket from './QRTicket';

const TicketPage = () => {
    const SERVER_URL = import.meta.env.VITE_BACKEND_SERVER_URL;
    const TICKET_URL = '/api/user/tickets/';
    
    const location = useLocation();
    const ticket = location.state;

    if (!ticket) {
        return <div>No ticket details available.</div>;
    }
    else if (ticket.error) {
        return <div>{ticket.error}</div>
    }

    const { 
        ticket_unique_identifier, 
        issue_time, 
        expiry_time, 
        trip_details, 
        validated_time,
        payment_status,
        order_id,
    } = ticket;

    // Destructuring trip details
    const { 
        bus_id, 
        source_stop_id, 
        destination_stop_id, 
        total_distance, 
        price_per_km
    } = trip_details;

    return (
        <div key={ticket_unique_identifier} className="ticket-page">
            <QRTicket url={SERVER_URL+TICKET_URL+ticket.ticket_unique_identifier} />
            <div className="qrinfo">
            <table>
                <tbody>
                    <tr>
                        <th>Ticket ID</th>
                        <td>{ticket_unique_identifier}</td>
                    </tr>
                    <tr>
                        <th>Issue Time</th>
                        <td>{new Date(issue_time).toLocaleString()}</td>
                    </tr>
                    <tr>
                        <th>Expiry Time</th>
                        <td>{new Date(expiry_time).toLocaleString()}</td>
                    </tr>
                    <tr>
                        <th>Validated Time</th>
                        <td>{new Date(validated_time).toLocaleString()}</td>
                    </tr>
                    <tr>
                        <th>Validation Status</th>
                        <td>Validated: {validated_time ? Math.round((new Date() - new Date(validated_time))/(60 * 1000)) + ' minutes ago': 'Not Yet'}</td>
                    </tr>
                    <tr>
                        <th>Bus ID</th>
                        <td>{bus_id}</td>
                    </tr>
                    <tr>
                        <th>Source Stop ID</th>
                        <td>{source_stop_id}</td>
                    </tr>
                    <tr>
                        <th>Destination Stop ID</th>
                        <td>{destination_stop_id}</td>
                    </tr>
                    <tr>
                        <th>Total Distance</th>
                        <td>{total_distance} km</td>
                    </tr>
                    <tr>
                        <th>Price per Km</th>
                        <td>${price_per_km}</td>
                    </tr>
                    <tr>
                        <th>Payement Status</th>
                        <td>{payment_status}</td>
                    </tr>
                    <tr>
                        <th>Order ID</th>
                        <td>{order_id}</td>
                    </tr>
                    <tr>
                        <th>Total Price</th>
                        <td>${total_distance * price_per_km}</td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default TicketPage;
