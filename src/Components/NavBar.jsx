import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Autocomplete } from "@react-google-maps/api";

const NavBar = ({ setCoordinates }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autoC) => setAutocomplete(autoC);
  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const lat = autocomplete.getPlace().geometry.location.lat();
      const lng = autocomplete.getPlace().geometry.location.lng();

      setCoordinates({ lat, lng });
      handleMenu();
    }
  };

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="flex justify-between items-center h-16 max-w-[1240px] mx-auto px-6">
      <h1 className="flex text-2xl lg:text-3xl text-blue-500 w-full font-bold my-3 ml-5">
        Travel Helper
      </h1>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <div className="md:flex w-96 bg-gray-200 rounded-md mr-5 my-3 hidden">
          <input
            type="search"
            name="search"
            placeholder="Search.."
            className="w-full border-black bg-transparent px-4 py-1 outline-none"
          ></input>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-md">
            Search
          </button>
        </div>
      </Autocomplete>
      <div onClick={handleMenu}>
        {showMenu ? (
          <AiOutlineClose className="text-2xl mr-5 text-blue-500" />
        ) : (
          <AiOutlineMenu className="text-2xl mr-5 text-blue-500 md:hidden" />
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={
          showMenu
            ? "fixed left-0 top-0 border-5 border-r-gray-300 h-full pt-16 mr-5 bg-white/90 ease-in-out duration-500 z-50"
            : "fixed left-[-100%]"
        }
      >
        <div className="flex ml-5">
          <h3 className="text-blue-800 text-lg">Explore new places</h3>
        </div>
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <div className="flex w-60 bg-gray-200 rounded-md ml-5 my-3 mr-3">
            <input
              type="search"
              name="search"
              placeholder="Search.."
              className="w-full border-black bg-transparent px-4 py-1 outline-none"
            ></input>
            <button
              onClick={onPlaceChanged}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-md"
            >
              Search
            </button>
          </div>
        </Autocomplete>
      </div>
    </nav>
  );
};

export default NavBar;
