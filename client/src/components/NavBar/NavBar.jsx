import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const NavBar = (props) => {

  NavBar.propTypes = {
    openSignInModal: PropTypes.func,
    isLandingPg: PropTypes.bool.isRequired,
  };

  return (
    <nav>
      <div>
        <div className="p-2 mt-0 fixed w-full z-10 top-0 shadow-lg navbar">
          <div className="flex justify-center text-white font-medium text-3xl">
            {/* Landing Page */}
            <Link to="/">
              <img width="150px" draggable="false" src="https://i.imgur.com/ATuMhih.png"></img>
            </Link>

          {/* Sign in/up button */}
          {
            props.isLandingPg &&
            <div
              onClick={props.openSignInModal}
              className="button text-white text-2xl font-semibold mb-2 text-right rounded cursor-pointer"
              style={{ height: "3.2rem" }}
            >
              <p style={{ paddingTop: "0.18rem" }}>Sign In/Up</p>
            </div>
          }

            {/* User settings button */}
            <Link to="/settings">⚙️</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};



export default NavBar;