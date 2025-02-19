import React from 'react'
import Pin from "../../assets/pin.png";
import Car from "../../assets/car.png";
import Trust from "../../assets/honesty.png";
import Card from '../../Components/Card/Card';
import Driver from "../../assets/driver.svg";
import Passenger from "../../assets/3725835.jpg";
import { Link } from 'react-router-dom';
import './home.css';
const Home = () => {
  return (
    <div className="home-container">
    <div className="home-title">
      <h1>Carpool to thousands of destinations at low prices</h1>
    </div>
    <div className="card-list">
      <Card icon={Pin} title={"Travel at low prices"} content={"Wherever you're going, there's a carpool that will get you there for less."} />
      <Card icon={Trust} title={"Trustworthy and simple"} content={"We check reviews, profiles, and IDs, so you know who you're travelling with; and our app is both simple and secure thanks to powerful technology."} />
      <Card icon={Car} title={"Proximity makes it easier"} content={"There is always a ride close to you. Now you can find the closest ride among the largest carpool network ever with a simple filter."} />
    </div>
    
    <div className="info">
      <div className="image">
        <img src={Driver} alt="Driver icon" />
      </div>
      <div className="content">
        <h1>Where do you want to drive to?</h1>
        <p>Carpooling is an affordable, comfortable, and eco-friendly way to travel! If you have empty seats, list your ride on WeGo to save costs and meet fellow travelers. Join our trustworthy community today!</p>
        <button>Offer your ride</button>
      </div>
    </div>

    <div className="info">
      <div className="content">
        <h1>What is your destination?</h1>
        <p>Carpooling is a great choice for passengers—economical, convenient, and a chance to meet new people! Book your ride on WeGo with trusted drivers and enjoy your journey!</p>
        <Link to="/get-ride" className="navLink">
          <button>Get a ride</button>
        </Link>
      </div>
      <div className="image">
        <img src={Passenger} alt="Passenger icon" />
      </div>
    </div>
  </div>
  )
}

export default Home
