import React, { useState } from 'react';
import './driverDashboard.css';

const DriverDashboard = () => {
  const [bookingRequests, setBookingRequests] = useState([
    { id: 1, passenger: 'John Doe', destination: 'Tunis', status: 'Pending' },
    { id: 2, passenger: 'Jane Smith', destination: 'Sfax', status: 'Pending' },
  ]);

  const handleValidateRequest = (id) => {
    setBookingRequests(bookingRequests.map(request =>
      request.id === id ? { ...request, status: 'Validated' } : request
    ));
  };

  const handleRejectRequest = (id) => {
    setBookingRequests(bookingRequests.filter(request => request.id !== id));
  };

  return (
    <div className="driver-dashboard">
      <h1>Driver Dashboard</h1>
      <div className="booking-list">
        {bookingRequests.map((request) => (
          <div key={request.id} className="booking-item">
            <div className="booking-details">
              <p><strong>Passenger:</strong> {request.passenger}</p>
              <p><strong>Destination:</strong> {request.destination}</p>
              <p><strong>Status:</strong> {request.status}</p>
            </div>
            <div className="booking-actions">
              {request.status === 'Pending' ? (
                <>
                  <button className="validate-btn" onClick={() => handleValidateRequest(request.id)}>Validate</button>
                  <button className="reject-btn" onClick={() => handleRejectRequest(request.id)}>Reject</button>
                </>
              ) : (
                <button className="disabled-btn" disabled>Request Validated</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriverDashboard;
