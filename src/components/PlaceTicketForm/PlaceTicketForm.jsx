const PlaceTicketForm = () => {
    return (
        <>
        <h2>Place Your Tickets</h2>
        <form>
          <label htmlFor="city">City: </label>
          <input list="cityList" id="city" name="city" placeholder="type your city here..." required />
          <datalist id="cityList">
            <option value="Gryfindor" />
            <option value="Hufflepuff" />
            <option value="Slytherin" />
            <option value="Ravenclaw" />
            <option value="Horned Serpent" />
            <option value="Thunderbird" />
            <option value="Pukwudgie" />
            <option value="Wampus" />
          </datalist>

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

          <input type="radio" name="busId" id="bus_id_1" value="bus_id_1" required />
          <label htmlFor="bus_id_1">bus_id_1, Fare: 100</label>
          <input type="radio" name="busId" id="bus_id_2" value="bus_id_2" />
          <label htmlFor="bus_id_2">bus_id_2, Fare: 200</label>
          <input type="radio" name="busId" id="bus_id_3" value="bus_id_3" />
          <label htmlFor="bus_id_3">bus_id_3, Fare: 300</label>

          <label htmlFor="noOfPassengers">No of Passengers: </label>
          <input type="number" name="noOfPassengers" id="noOfPassengers" min="1" max="50" step="1" defaultValue={1} required />

          <button type="submit">Place Ticket</button>
        </form>
        </>
    )
}

export default PlaceTicketForm;