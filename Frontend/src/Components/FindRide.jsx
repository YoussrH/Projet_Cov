import React from 'react';
import SearchRide from '../../Components/SearchRide/SearchRide';
import OptionCard from '../../Components/optionCard/OptionCard';
import './findRide.css';

const FindRide = () => {
  return (
    <div className="getRide-container">
      <div className="search-ride">
        <SearchRide
          location=""
          setLocation={() => {}}
          destination=""
          setDestination={() => {}}
          date=""
          setDate={() => {}}
        />
      </div>

      <h1 className="section-title">Offers</h1>

      <div className="no-rides">
        <p className="no-rides-text">You haven't searched for any rides yet or no rides match your criteria.</p>
        <div className="empty-card-container">
          <div className="empty-card">
            <p>Empty Card</p>
          </div>
          <div className="empty-card">
            <p>Empty Card</p>
          </div>
          <div className="empty-card">
            <p>Empty Card</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindRide;
