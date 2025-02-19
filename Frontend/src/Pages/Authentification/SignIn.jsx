import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import vid from '../../assets/signIn.mp4';
import logo from '../../assets/volant.png';
import { MdMarkEmailRead } from 'react-icons/md';
import { BsShieldLockFill } from 'react-icons/bs';
import './death.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Handle input change for both email and password
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
 // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    console.log('Request data:', formData);

    const response = await fetch('http://localhost:8081/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const contentType = response.headers.get('Content-Type');
      let result;
      
      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      } else {
        result = await response.text();
      }

      console.log('Full response from login API:', result);

      // Handle text response
      if (typeof result === 'string' && result.includes('Login successful!')) {
        // Extract email from welcome message
        const email = result.match(/Welcome (.+@.+\..+)$/)[1];
        
        // Store email in sessionStorage since we don't have userId
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('isLoggedIn', 'true');
        
        setMessage('Login successful!');
        navigate('/');
      }
      // Handle JSON response 
      else if (result.userId) {
        console.log('User data:', result.userId);
        sessionStorage.setItem('userId', result.userId);
        sessionStorage.setItem('authToken', result.authToken || '');
        setMessage('Login successful!');
        navigate('/');
      } else {
        setMessage('Login successful, but user data not found.');
      }
    } else {
      const error = await response.text();
      setMessage(error || 'Invalid credentials!');
    }
  } catch (error) {
    console.error('Error during login:', error);
    setMessage('An error occurred. Please try again later.');
  }
};
  

  return (
    <div className="loginPage flex">
      <div className="container flex">
        <div className="VideoDiv">
          <video src={vid} autoPlay muted loop></video>

          <div className="textDiv">
            <h2 className="title">Welcome Back</h2>
            <p>Sign in to continue carpooling!</p>
          </div>

          <div className="footerDiv flex">
            <span className="text">Don’t have an account yet?</span>
            <Link to="/SignUp" className="btn">Sign Up</Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="car logo" />
            <h3>Sign In</h3>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <div className="inputGroup">
              <div className="inputDiv">
                <label htmlFor="email">Email</label>
                <div className="input flex">
                  <MdMarkEmailRead className="icon" />
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                    required
                  />
                </div>
              </div>

              <div className="inputDiv">
                <label htmlFor="password">Password</label>
                <div className="input flex">
                  <BsShieldLockFill className="icon" />
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Show message (success or error) */}
            <div className="error">{message}</div>

            <button type="submit" className="btn btnSign flex">
              <span>Sign In</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;