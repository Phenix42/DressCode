// Header.js
import React from 'react';

const Header = ({ userName }) => {
  return (
    <div className="row mb-4">
      <div className="col">
        <h5>Welcome Back, {userName}</h5>
        <a>Here is the information about all your orders</a>
      </div>
      <div className="col text-right">
        <button className="btn btn-outline-secondary mr-2">
          <i className="fa fa-search"></i>
        </button>
        <span>{userName}</span>
      </div>
    </div>
  );
};

export default Header;
