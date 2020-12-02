import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const NavBar = (props) => {

  NavBar.propTypes = {
    openSignInModal: PropTypes.func,
    isLandingPg: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
  };

  return (
    <nav>
      <div>
        <div className="p-2 mt-0 fixed w-full z-10 top-0 shadow-lg navbar">
          <div className="flex justify-center text-white font-medium text-3xl">
            {/* Landing Page */}
            <Link to="/">
              <img width="150px" draggable="false" src="https://i.imgur.com/ATuMhih.png" alt="Timely"></img>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};



export default NavBar;