import { useState } from "react";
import { useFetchBusStopDetails } from "../hooks/useFetchBusStopDetails";
import { usePlaceTicket } from "../hooks/usePlaceTicket";

const PlaceTicketBusId = () => {
    const [busId, setBusId] = useState('');
    const [busInfo, setBusInfo] = useState(null);
    const [noOfPassengers, setNoOfPassengers] = useState(1);

    const [stopList, setStopList] = useState([]);
    const [fromStop, setFromStop] = useState('');
    const [toStop, setToStop] = useState('');

    const { fetchStopsByBusID, error:busIdError } = useFetchBusStopDetails();
    const { placeTicket, isLoading, error } = usePlaceTicket();

    const handleClick = (e) => {
        fetchStopsByBusID(busId)
            .then(data => {
                if (data) {
                    setBusInfo(data);
                    setStopList(data.stop_details);
                }
            })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await placeTicket(fromStop, toStop, busId, noOfPassengers);
    }

    const GetStopList = () => {
        return stopList.map(stop => 
        <option 
            key={stop.stop_id}
            value={stop.stop_id}
        >{stop.stop_name}</option>)
    }

    const CalculateFare = () => {
        const from = stopList.filter(stop => stop.stop_id === parseInt(fromStop))[0];
        const to = stopList.filter(stop => stop.stop_id === parseInt(toStop))[0];
        if (from && to && noOfPassengers > 0) {
            const distance = to.distance_from_start - from.distance_from_start;
            if (distance <= 0) {
                return <p>Give valid source and destination, Destination should come after source</p>
            }
            const totalFare = busInfo.price * distance * noOfPassengers
            return totalFare > 0 ? 
                        <>
                        <p><em>Total Fare: <b>&#x20B9; {totalFare}</b></em></p> 
                        <button type="submit" disabled={isLoading}>Place Ticket</button>
                        </>
                        : 
                        <button type="submit" disabled={isLoading}>Place Ticket</button>;
        }
        return <button type="submit" disabled>Place Ticket</button>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Place Your ticket below</h2>
            {/* Check how to receive the Bus ID via QR scanner */}
            <label htmlFor="busId">Bus ID: </label>
            <input 
                type="number" 
                name="busId" 
                id="busId" 
                value={busId} 
                onChange={(e) => setBusId(e.target.value)} 
                required 
            />
            <button onClick={handleClick} type="button">Get Stops</button>
            {busIdError && <p>{busIdError} !!</p>}

            <select 
                name="fromStop" 
                id="fromStop" 
                value={fromStop}
                onChange={(e) => setFromStop(e.target.value)}
                disabled={stopList.length > 0 ? false : true}
                required
            >
                <option value="" >FROM</option>
                <GetStopList />
            </select>

            <select 
                name="toStop" 
                id="toStop" 
                value={toStop}
                onChange={(e) => setToStop(e.target.value)}
                disabled={stopList.length > 0 ? false : true}
                required
            >
                <option value="">TO</option>
                <GetStopList />
            </select>

            <label htmlFor="noOfPassengers">No of Passengers: </label>
            <input 
                type="number" 
                name="noOfPassengers" 
                id="noOfPassengers" 
                min="1" 
                max="50" 
                step="1" 
                value={noOfPassengers}
                onChange={(e) => setNoOfPassengers(e.target.value)}
                disabled={stopList.length > 0 ? false : true}
                required 
            />

            <CalculateFare />
            {isLoading && <p>Placing your ticket....</p>}
            {error && <p>{error}</p>}
        </form>
    )
}

export default PlaceTicketBusId;