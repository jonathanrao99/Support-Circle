import React, { useState } from 'react';
import SignUpModal from './SignUpModal';


function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="logo.png" alt="Supportcircle Logo" />
        <span>Support Circle</span>
      </div>
      <div className="nav-links">
        <ul className="nav-links">
          <li className="active"><a href="#">Home</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
        <button onClick={openModal} className="sign-up-button">
          Sign Up
        </button>
      </div>
      
      {isModalOpen && <SignUpModal onClose={() => setIsModalOpen(false)} />}
    </nav>
  );
}

export default Navbar;
