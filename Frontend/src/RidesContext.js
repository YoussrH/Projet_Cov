import React, { createContext, useState } from 'react';

export const RidesContext = createContext();

export const RidesProvider = ({ children }) => {
  const [rides, setRides] = useState([]);

  const addRide = (newRide) => {
    setRides((prevRides) => [...prevRides, newRide]);
  };

  return (
    <RidesContext.Provider value={{ rides, addRide }}>
      {children}
    </RidesContext.Provider>
  );
};
