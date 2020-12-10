import React from 'react';
import NavBar from '../NavBar/NavBar.jsx';


export const NotFound = () => {

  return (
    <div style={{ backgroundColor: "#ededed" }} className="h-screen">
      <NavBar />
      <div className="justify-center" style={{ backgroundColor: "#ededed" }}>
        <div className="col-span-9 xl:col-span-5 flex-grow justify-center w-full pt-16 xl:pt-20 px-5" style={{ backgroundColor: "#ededed" }}>
          <div className="flex justify-center pt-10 pb-4">
            <img
              src={process.env.PUBLIC_URL + '/404.jpg'}
              className="shadow-lg"
              alt="Page Not Found"
            />
          </div>
          <div className="flex justify-center text-5xl text-center text-gray-700 rounded-full pt-4 pb-4">
            <p className="font-medium "> 404 Error </p>
          </div>
          <div className="flex justify-center text-2xl text-center text-gray-600 rounded-full pt-4 pb-4">
            <p className="font-normal"> The page you requested does not exist ¯\_(ツ)_/¯ </p>
          </div>
          <div className="flex justify-center pt-4 pb-4">
            <button
              type="button"
              className="button text-white text-2xl font-semibold mb-2 text-center rounded cursor-pointer shadow-md flex justify-center"
              style={{ height: "3rem", padding: " 0 1rem 0 1rem", margin: "10px" }}>
              <a href="/" style={{ padding: "0.1rem" }}> Go go back to main page </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
