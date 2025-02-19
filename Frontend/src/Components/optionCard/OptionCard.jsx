// OptionCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./optionCard.css";
import Profile from "../../assets/profile-pic.svg";

const OptionCard = ({ location, destination, date}) => {
    const navigate = useNavigate();

    // Define additional details
    const time = "7:00 AM"; // Change as needed or pass as props for dynamic data
    const driverName = "Greg Hooper"; // Change as needed or pass as props
    const driverPic = Profile; // Assuming Profile is the driver's image

    const handleCardClick = () => {
        navigate("/ride-details", { 
            state: { 
                location, 
                destination, 
                date, 
                time, 
                driverName,
                driverPic
            } 
        });
    };

    return (
        <div className='offers'>
            <section className="offers-container" onClick={handleCardClick}>
                <div>
                    <h2>From</h2>
                    <p className="offer-content">{location || "Location not specified"}</p>

                    <h2>To</h2>
                    <p className="offer-content">{destination || "Destination not specified"}</p>

                    <h2>Date</h2>
                    <p className="offer-content">{date || "Date not specified"}</p>

                    <h2>Time</h2>
                    <p className="offer-content">{time}</p>

                    <ul>
                        <h2>Driver</h2>
                        <li>
                            <img src={driverPic} alt="Driver" className='driver-pic' />
                        </li>
                        <li>{driverName}</li>
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default OptionCard;
