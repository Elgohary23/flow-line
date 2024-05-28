import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar() {
  return (
    <nav>
      <Link to="/" className="brandname">Flow Line</Link>
      <div className="nav-list">
        <Link to="/about" className="about">About</Link>
        <Link to="/contact" className="contact">Contact</Link>
      </div>
    </nav>
  );
}

export default NavBar;
