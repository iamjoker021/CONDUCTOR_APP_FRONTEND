const PlaceTicketBusId = () => {
    return (
        <form>
            {/* Check how to receive the Bus ID via QR scanner */}
            <label htmlFor="busId">Bus ID: </label>
            <input type="number" name="busId" id="busId" required />

            <input list="FromList" id="fromLocation" name="fromLocation" placeholder="From..." required />
            <datalist id="FromList">
                <option value="Gryfindor" />
                <option value="Hufflepuff" />
                <option value="Slytherin" />
                <option value="Ravenclaw" />
                <option value="Horned Serpent" />
                <option value="Thunderbird" />
                <option value="Pukwudgie" />
                <option value="Wampus" />
            </datalist>

            <input list="ToList" id="toLocation" name="toLocation" placeholder="To..." required />
            <datalist id="ToList">
                <option value="Gryfindor" />
                <option value="Hufflepuff" />
                <option value="Slytherin" />
                <option value="Ravenclaw" />
                <option value="Horned Serpent" />
                <option value="Thunderbird" />
                <option value="Pukwudgie" />
                <option value="Wampus" />
            </datalist>

            <label htmlFor="noOfPassengers">No of Passengers: </label>
            <input type="number" name="noOfPassengers" id="noOfPassengers" min="1" max="50" step="1" defaultValue={1} required />

            <p><em>Total Fare: <b>DO_CALCULATION</b></em></p>

            <button type="submit">Place Ticket</button>
        </form>
    )
}

export default PlaceTicketBusId;