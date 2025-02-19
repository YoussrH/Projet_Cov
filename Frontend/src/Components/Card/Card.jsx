import React from 'react'
import "./card.css"

const Card = ({ icon, title, content }) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white p-6">
      <div className="flex justify-center mb-4">
        <img src={icon} alt="icon" className="w-16 h-16 object-contain" />
      </div>

      <div className="text-center">
        <div className="text-xl font-semibold text-gray-800 mb-2">
          {title}
        </div>
        <div className="text-gray-600 text-sm">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Card;
