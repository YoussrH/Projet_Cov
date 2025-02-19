import React from 'react';
import Carpool from "../../assets/undraw_order-ride_4gaq.svg";
import "./searchRide.css";

const SearchRide = ({ location, setLocation, destination, setDestination, date, setDate, onSearch }) => {
  const cities = [
    'Tunis', 'Sfax', 'Sousse', 'Gabès', 'Bizerte', 'Ariana', 'Kairouan', 'Gafsa', 'Ben Arous',
    'Monastir', 'Medenine', 'Nabeul', 'Tataouine', 'Kasserine', 'Kebili', 'Mahdia', 'Jendouba',
    'Manouba', 'Tozeur', 'Siliana', 'Beja', 'Zaghouan'
  ];

  return (
    <div className="search-ride-container">
      {/* Input Section */}
      <div className="input-section">
        <h1>Request a ride for now or later</h1>
        <p>Add your trip details, hop in, and go.</p>
        <div className="inputs">
          {/* Location */}
          <label>
            Location:
            <select value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="" disabled>Select Location</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
          </label>

          {/* Destination */}
          <label>
            Destination:
            <select value={destination} onChange={(e) => setDestination(e.target.value)}>
              <option value="" disabled>Select Destination</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
          </label>

          {/* Date */}
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>

          {/* Search Button */}
          <button onClick={onSearch}>Search</button>
        </div>
      </div>

      {/* Image Section */}
      <img src={Carpool} alt="Carpool Illustration" className="cover-image" />
    </div>
  );
};

export default SearchRide;
