import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { faBars, faSignOutAlt, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from 'react';

export const NavBar = (props) => {

  const [dotsClick, setDotsClick] = useState(false);
  const [barsClick, setBarsClick] = useState(false);
  const [isLocationMain,] = useState(window.location.pathname + window.location.search === "/");

  NavBar.propTypes = {
    openSignInModal: PropTypes.func,
    isLandingPg: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    rightSideBarRenderer: PropTypes.func,
    leftSideBarRenderer: PropTypes.func
  };


  const renderLeftMenu = () => {
    props.leftSideBarRenderer();
  }



  const renderRightMenu = () => {
    props.rightSideBarRenderer();
  }

  const renderBars = () => {
    if (isLocationMain) {
      return (
        <div className="flex justify-start" onClick={renderLeftMenu}>
          <div className="items-center cursor-pointer pl-4 block md:hidden" style={{ paddingTop: "0.45rem" }}>
            <FontAwesomeIcon icon={faBars} />
          </div>
        </div>
      );
    }
  }

  const renderDots = () => {
    if (isLocationMain) {
      return (
        <div className="flex justify-end" onClick={renderRightMenu}>
          <div className="items-center cursor-pointer pr-4 block xl:hidden" style={{ paddingTop: "0.45rem" }}>
            <FontAwesomeIcon icon={faPowerOff} />
          </div>
        </div>
      );
    }
  }

  return (
    <nav>
      <div>
        <div className="p-2 mt-0 z-40 fixed w-full z-10 top-0 shadow-lg navbar">
          <div className="grid grid-cols-3 text-white font-medium text-3xl">

            {renderBars()}

            <div className="flex justify-center">
              <Link to="/">
                <img width="150px" draggable="false" src="https://i.imgur.com/ATuMhih.png" alt="Timely"></img>
              </Link>
            </div>

            {renderDots()}

          </div>
        </div>
      </div>
    </nav>
  );
};



export default NavBar;