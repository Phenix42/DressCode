// Header.js
import React from 'react';

const Header = ({ userName }) => {
  return (
    <div className="row mb-4">
          <header className="d-flex justify-content-between align-items-center my-3">
        <h2 className="mb-0">Welcome Back, Madhur</h2>
        <div>
          <img src="profile-placeholder.jpg" alt="Profile" className="rounded-circle profile-image" width="40" height="40" />
        </div>
      </header>
      <p className="text-muted">Here is the information about all your orders</p>
    </div>
  );
};

export default Header;
