import React from 'react';
import { useLocation } from 'react-router-dom';

const TicketPage = () => {
    const location = useLocation();
    const ticket = location.state;

    if (!ticket) {
        return <div>No ticket details available.</div>;
    }

    const { 
        ticket_unique_identifier, 
        ticket_qr, 
        issue_time, 
        expiry_time, 
        trip_details, 
        user_id 
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
            <div className="qrimage">
                <img src={ticket_qr} alt="Ticket QR Code" />
            </div>
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
