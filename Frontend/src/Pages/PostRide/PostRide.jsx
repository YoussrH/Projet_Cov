import React, { useState } from 'react';
import './postRide.css';
import Car from '../../assets/carpoolll.png';
import axios from 'axios';
const PostRide = () => {
  const [formData, setFormData] = useState({
    departureCity: '',
    arrivalCity: '',
    date: '',
    seats: 1,
    price: '',
    meetingLocation: '',
    licensePlate: '',
    vehicleType: '',
    status: 'Available',
    totalSeats: 4,
    availableSeats: 4,
    departureTime: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Static list of governorates
  const cities = [
    { id: 1, name: 'Tunis' },
    { id: 2, name: 'Sfax' },
    { id: 3, name: 'Sousse' },
    { id: 4, name: 'Kairouan' },
    { id: 5, name: 'Monastir' },
    { id: 6, name: 'Nabeul' },
    { id: 7, name: 'Gabes' },
    { id: 8, name: 'Tozeur' },
    // Add more cities or governorates here if needed
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:8080/api/carpool/add', formData);
      console.log('Carpool added:', response.data);
      // Clear form after submission
      setFormData({
        departureCity: '',
        arrivalCity: '',
        date: '',
        seats: 1,
        price: '',
        meetingLocation: '',
        licensePlate: '',
        vehicleType: '',
        status: 'Available',
        totalSeats: 4,
        availableSeats: 4,
        departureTime: '',
      });
    } catch (error) {
      console.error('Error adding carpool:', error);
      setErrorMessage('Error adding carpool. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="PostRideContainer">
      <div className="container">
        {loading && <p>Loading...</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="form">
          <h1>Offer a Ride</h1>
          
          <div className="form-group-group">
            <div className="form-group">
              <label htmlFor="departureCity">Departure City</label>
              <select
                id="departureCity"
                name="departureCity"
                value={formData.departureCity}
                onChange={handleChange}
              >
                <option value="" disabled>Select departure city</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.name}>{city.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="arrivalCity">Arrival City</label>
              <select
                id="arrivalCity"
                name="arrivalCity"
                value={formData.arrivalCity}
                onChange={handleChange}
              >
                <option value="" disabled>Select arrival city</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.name}>{city.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group-group">
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="departureTime">Departure Time</label>
              <input
                type="time"
                id="departureTime"
                name="departureTime"
                value={formData.departureTime}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="meetingLocation">Meeting Location</label>
            <input
              type="text"
              id="meetingLocation"
              name="meetingLocation"
              value={formData.meetingLocation}
              onChange={handleChange}
              placeholder="Where will you meet?"
            />
          </div>

          <div className="form-group-group">
            <div className="form-group">
              <label htmlFor="seats">Seats Available</label>
              <input
                type="number"
                id="seats"
                name="seats"
                value={formData.seats}
                onChange={handleChange}
                min="1"
                max={formData.totalSeats}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price per seat"
              />
            </div>
          </div>

          <button type="submit" className="submit-btn" style={{marginLeft:'40%'}}>Submit Ride</button>
        </form>
      </div>
    </div>
  );
};

export default PostRide;
