import React, { useState, useEffect } from "react";

const Header: React.FC = () => {
  const [isInView, setIsInView] = useState(true);
  const handleScroll = () => {
    if (window.scrollY === 0) {
      setIsInView(true);
    } else {
      setIsInView(false);
    }
  };
  useEffect(() => {
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 w-full h-auto z-50 transition ease-in-out duration-300 bg-gradient-to-b from-base-100 via-transparent to-transparent 
      ${!isInView ? "bg-opacity-50 backdrop-blur-sm backdrop-brightness-100 bg-base-100" : ""}
      `}
    >
      <div className="navbar lg:w-9/12 w-full mx-auto py-2 lg:p-0 p-3 ">
        <div className="navbar-start">
          <a href="/" className="text-xl font-bold">
            <img className="h-12 w-12" src="assets/icon/icon.png" alt="" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn btn-sm bg-transparent border-0">Button</a>
        </div>
      </div>
    </div>
  );
};
export default Header;
