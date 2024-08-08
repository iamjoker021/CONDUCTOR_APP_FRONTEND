import { useEffect, useState } from "react";

const PlaceTicketBusId = () => {
    const [busId, setBusId] = useState('');

    const [busInfo, setBusInfo] = useState(null);

    const [stopList, setStopList] = useState([]);
    const [fromStop, setFromStop] = useState('');
    const [toStop, setToStop] = useState('');

    const [noOfPassengers, setNoOfPassengers] = useState(1);

    const fetchStopsByBusID = () => {
        if (busId !== '' && !isNaN(+busId)) {
            const SERVER_URL = 'http://localhost:3000/api';
            const GET_BUS_URL = '/bus-route/bus/';

            fetch(SERVER_URL + GET_BUS_URL + busId)
                .then(response => response.json())
                .then(data => {
                    const busInfo = data.busStopsDetails[0];
                    setBusInfo(busInfo);
                    if (busInfo.stop_details.length) {
                        const stops = busInfo.stop_details.sort((from, to) => from.stop_order - to.stop_order);
                        setStopList(stops);
                    }
                });
        }
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
                return <p>Give valid source and destination</p>
            }
            const totalFare = busInfo.price * distance * noOfPassengers
            return totalFare > 0 ? 
                        <>
                        <p><em>Total Fare: <b>&#x20B9; {totalFare}</b></em></p> 
                        <button type="submit">Place Ticket</button>
                        </>
                        : 
                        <button type="submit">Place Ticket</button>;
        }
        return <button type="submit" disabled>Place Ticket</button>;
    }

    return (
        <form>
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
            <button onClick={e => fetchStopsByBusID()} type="button">Get Stops</button>

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
        </form>
    )
}

export default PlaceTicketBusId;