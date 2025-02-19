import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BecomeDriver = () => {
  const [formData, setFormData] = useState({
    address: '',
    cin: '',
    dateOfBirth: '',
    licenseNumber: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = sessionStorage.getItem('userId');
    const authToken = sessionStorage.getItem('authToken');
  
    try {
      const response = await fetch(`http://localhost:8081/api/users/become-driver/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
      });
  
      console.log('Response:', response);
  
      if (response.ok) {
        const contentType = response.headers.get('Content-Type');
        let result;
        if (contentType && contentType.includes('application/json')) {
          result = await response.json();
        } else {
          result = await response.text();
        }
        console.log('Result:', result);
        setMessage('Your driver request has been submitted!');
        navigate('/'); // Redirect to the home page after successful submission
      } else {
        const result = await response.json();
        console.log('Error Result:', result);
        setMessage(result.message || 'Failed to submit the form');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to connect to the server.');
    }
  };
  return (
    <div className='becomeDriverPage flex'>
      <form onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            required
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="cin">CIN:</label>
          <input
            type="text"
            id="cin"
            value={formData.cin}
            onChange={handleChange}
            placeholder="Enter your CIN"
            required
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="licenseNumber">License Number:</label>
          <input
            type="text"
            id="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
            placeholder="Enter your license number"
            required
          />
        </div>

        <button type="submit">Submit Request</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BecomeDriver;