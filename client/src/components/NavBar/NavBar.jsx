import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { faBars, faSignOutAlt, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const NavBar = (props) => {

  NavBar.propTypes = {
    openSignInModal: PropTypes.func,
    isLandingPg: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
  };

  return (
    <nav>
      <div>
        <div className="p-2 mt-0 z-40 fixed w-full z-10 top-0 shadow-lg navbar">
          <div className="grid grid-cols-3 text-white font-medium text-3xl">
            {/* Landing Page */}


            {/* 3 BARS  */}

            <div className="flex justify-start">
                <div className="items-center cursor-pointer pl-4 block md:hidden" style={{ paddingTop: "0.45rem" }}>
                  <FontAwesomeIcon icon={faBars} />
                </div>
            </div>

            {/* DROPDOWN - CONDITIONALLY RENDER IF 3 BARS TOGGLED  */}

            {/* <div class="origin-top-left absolute left-0 mt-2 ml-2 mt-20 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 border-2 border-light-blue-500">
              <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <a href="#" class="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 hover:text-gray-900">Home</a>
                <a href="#" class="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 hover:text-gray-900">Trending</a>
                <a href="#" class="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 hover:text-gray-900">Newest</a>
                <a href="#" class="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 hover:text-gray-900">Expiring</a>
                <a href="#" class="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 hover:text-gray-900">Longest</a>
              </div>
            </div> */}

            <div  className="flex justify-center">
              <Link to="/">
                <img width="150px" draggable="false" src="https://i.imgur.com/ATuMhih.png" alt="Timely"></img>
              </Link>
            </div>

            <div className="flex justify-end">
                <div className="items-center cursor-pointer pr-4 block xl:hidden" style={{ paddingTop: "0.45rem" }}>
                  <FontAwesomeIcon icon={faPowerOff} />
                </div>
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};



export default NavBar;