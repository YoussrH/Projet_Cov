import React, { useState } from 'react';
import vid from '../../assets/SignUp.mp4';
import logo from '../../assets/volant.png';
import { Link } from 'react-router-dom';
import { MdMarkEmailRead } from 'react-icons/md';
import { FaUserShield } from 'react-icons/fa';
import './death.css';
import { BsShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    password: '',
    phoneNumber: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8081/api/users/adduser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('User registered successfully!');
        setFormData({ email: '', fullName: '', password: '', phoneNumber: '' });
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setMessage('Failed to connect to the server.');
    }
  };

  return (
    <div className='loginPage flex'>
      <div className='container flex'>
        <div className='VideoDiv'>
          <video src={vid} autoPlay muted loop></video>

          <div className='textDiv'>
            <h2 className='title'>Revolutionize your commute with safer carpooling</h2>
            <p>Let's Ride together</p>
          </div>

          <div className='footerDiv flex'>
            <span className='text'>Already have an account?</span>
            <Link to="/SignIn" className='btn'>Sign In</Link>
          </div>
        </div>

        <div className='formDiv flex'>
          <div className='headerDiv'>
            <img src={logo} alt="car logo" />
            <h3>Let Us Know You</h3>
          </div>

          <form className='form' onSubmit={handleSubmit}>
            <div className='inputGroup'>
              <div className='inputDiv'>
                <label htmlFor="email">Email</label>
                <div className='input flex'>
                  <MdMarkEmailRead className='icon' />
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

              <div className='inputDiv'>
                <label htmlFor="fullName">FullName</label>
                <div className='input flex'>
                  <FaUserShield className='icon' />
                  <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter fullName"
                    required
                  />
                </div>
              </div>
            </div>

            <div className='inputGroup'>
              <div className='inputDiv'>
                <label htmlFor="password">Password</label>
                <div className='input flex'>
                  <BsShieldLockFill className='icon' />
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

              <div className='inputDiv'>
                <label htmlFor="phoneNumber">Phone Number</label>
                <div className='input flex'>
                  <FaUserShield className='icon' />
                  <input
                    type="text"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter Phone Number"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="error">{message}</div>

            <button type="submit" className="btn btnSign flex">
             <span>Sign Up</span>
              <AiOutlineSwapRight className="icon" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
