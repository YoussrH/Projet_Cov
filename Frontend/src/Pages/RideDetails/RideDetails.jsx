import React from 'react';
import { useLocation } from 'react-router-dom';
import Profile from "../../assets/profile-pic.svg"; // Adjust the path as necessary
import "./rideDetails.css"; // Create and style this CSS as needed
import CarIcon from "../../assets/car-icon.png"
import PetIcon from "../../assets/iconPet.png"
import SmokeIcon from "../../assets/nosmoking.png"

const RideDetails = () => {
    const locationState = useLocation();
    const { location, destination, date, time, driverName, driverPic } = locationState.state || {};

    return (
        <>
        <div className='pageContainer'>

        <div className='driver-details'>
            <div className="detail-item driver-info">
                    <img src={driverPic || Profile} alt="Driver" className='driver-pic' />
                <p>{driverName || "Driver not specified"}</p>
            </div>

            <div className='detail-item '>
                <h2>Car</h2>
                <div className='image-text-group'>
                    <img src={CarIcon} alt="" className='icon' />
                    <h3>TOYOTA C-HR - Blue</h3>
                </div>
            </div>

            <div className=' rules-details'>
                <h2>Ride Rules</h2>
                <div className='image-text-group'>
                    <img src={PetIcon} alt="" className='icon' />
                    <h3>I’d prefer not to travel with pets
                    </h3>
                </div>
                <div className='image-text-group'>
                    <img src={SmokeIcon} alt="" className='icon' />
                    <h3>I’d prefer no smoking in the car </h3>
                </div>
            </div>
        </div>
        <div className="ride-details">
            <h1>Ride Details</h1>
            <div className="detail-item">
                <h2>From:</h2>
                <p>{location || "Location not specified"}</p>
            </div>
            <div className="detail-item">
                <h2>To:</h2>
                <p>{destination || "Destination not specified"}</p>
            </div>
            <div className="detail-item">
                <h2>Date:</h2>
                <p>{date || "Date not specified"}</p>
            </div>
            <div className="detail-item">
                <h2>Time:</h2>
                <p>{time || "Time not specified"}</p>
            </div>
             <button className='book'>Request to book </button>
        </div>
        </div>
        </>
    );
};

export default RideDetails;
