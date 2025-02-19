import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/volant.png';

const Navbar = () => {
  const [message, setMessage] = useState('');
  const [isDriver, setIsDriver] = useState(false);
  const navigate = useNavigate();
  
  // Check if the user is logged in by checking sessionStorage for userId
  const isLoggedIn = sessionStorage.getItem('userId');
  const userId = sessionStorage.getItem('userId');  // Get userId from sessionStorage

  useEffect(() => {
    // Check if the user is a driver by checking sessionStorage for isDriver
    const driverStatus = sessionStorage.getItem('isDriver');
    if (driverStatus) {
      setIsDriver(true);
    }
  }, []);

  // Handle logout functionality
  const handleLogout = () => {
    sessionStorage.clear(); // Clear sessionStorage on logout
    setIsDriver(false);
    navigate('/'); // Redirect to home page after logout
  };

  // Handle become a driver functionality
  const handleBecomeDriver = async () => {
    const driverDetails = {
      // You can add any details required for becoming a driver here
      // Example: name, car details, etc.
      carModel: "Toyota Corolla",
      licensePlate: "ABC123"
    };

    try {
      const response = await fetch(`http://localhost:8081/api/users/become-driver/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(driverDetails),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('You are now a driver!');
        sessionStorage.setItem('isDriver', 'true'); // Set driver status in sessionStorage
        setIsDriver(true);
        console.log(result);
      } else {
        setMessage(result.message || 'Failed to become a driver');
        console.error(result);
      }
    } catch (error) {
      setMessage('Failed to connect to the server.');
      console.error(error);
    }
  };

  return (
    <nav className="bg-white-900 text-white px-4 py-2 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-2 ml-9">
        <img src={logo} alt="Carpool Logo" className="h-15 w-10" />
        <span className="text-xl font-bold" style={{color: 'rgb(254, 197, 82)', marginRight: '-7px'}}>Car</span>
        <span className="text-xl font-bold text-blue-900">pool</span>
      </div>

      {/* Search Bar */}
      <div className="flex items-center max-w-md mx-auto mt-2 ml-20">
        <input
          type="text"
          placeholder=" 📍Tell us Your Location..."
          className="w-full h-9 px-4 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button className="bg-yellow-400 px-4 py-2 rounded-r-md text-white hover:bg-yellow-500 h-9">
          🔍
        </button>
      </div>

      {/* Navbar Links */}
      <div className="flex items-center space-x-4 ml-4">
        <div className="flex items-center space-x-6 ml-9">
          <Link to="/" className="flex items-center text-gray-700 hover:text-yellow-400 font-medium transition duration-200">
            <span className="ml-2">Home</span>
          </Link>
        
          <Link to="/complain" className="flex items-center text-gray-700 hover:text-yellow-400 font-medium transition duration-200">
            <span className="ml-2">File Complain</span>
          </Link>
        </div>

        <Link to="/get-ride" className="text-gray-700 hover:text-yellow-400 font-medium transition duration-200">
          Find a Ride
        </Link>
        <Link to="/Post-ride" className="text-gray-700 hover:text-yellow-400 font-medium transition duration-200">
          Post a Carpool
        </Link>

        {/* Conditional Rendering for "Ride With Carpool" or "Logout" */}
        {isLoggedIn ? (
          <>
            <button 
              onClick={handleLogout} 
              className="px-4 py-3 rounded-md text-white bg-red-600 hover:bg-red-700 font-medium transition duration-200"
            >
              Log Out
            </button>

            {/* "Become a Driver" Button */}
            {!isDriver && (
              <button 
                onClick={handleBecomeDriver}
                className="px-4 py-3 rounded-md text-white bg-green-600 hover:bg-green-700 font-medium transition duration-200"
              >
                Become a Driver
              </button>
            )}

            {/* Display message after becoming a driver */}
            {message && <div className="text-green-600 mt-2">{message}</div>}
          </>
        ) : (
          <Link 
            to="/SignUp" 
            style={{background:'#205962'}} 
            className="px-4 py-3 rounded-md text-white hover:text-yellow-400 font-medium transition duration-200"
          >
            Ride With Carpool
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;