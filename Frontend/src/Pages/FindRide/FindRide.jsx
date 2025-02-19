import React, { useState, useContext } from 'react';
import { RidesContext } from '../../RidesContext';
import SearchRide from '../../Components/SearchRide/SearchRide';
import OptionCard from '../../Components/optionCard/OptionCard';
import './findRide.css';

const FindRide = () => {
  const [location, setLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const { rides } = useContext(RidesContext); // Get rides from context

  const filteredOffers = rides.filter(offer =>
    (!location || offer.origin === location) &&
    (!destination || offer.destination === destination) &&
    (!date || offer.date === date)
  );

  return (
    <>

      <div className='getRide-container'>
        <div className='search-ride'>
          <SearchRide 
            location={location} 
            setLocation={setLocation} 
            destination={destination} 
            setDestination={setDestination} 
            date={date} 
            setDate={setDate} 
          />
        </div>
        <h1 className='section-title'>Offers</h1>
        <h4>You didin't search for any carpool yet !!</h4>
        <div className='ride-offers'>
          {filteredOffers.map((offer, index) => (
            <OptionCard 
              key={index} 
              location={offer.origin} 
              destination={offer.destination} 
              date={offer.date} 
              driverName="Driver A" 
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default FindRide;
