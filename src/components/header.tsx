import React, { useState, useEffect } from "react";

const isInViewport = (id: string) => {
  const element = document.getElementById(id);
  if (!element) return false;

  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};
const Header: React.FC = () => {
  const [scrollDir, setScrollDir] = useState("");
  const [isInView, setIsInView] = useState(false);
  const targetId = "top";
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      setIsInView(isInViewport(targetId));
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 w-full h-auto z-30 
      ${!isInView ? "bg-opacity-80 backdrop-blur-sm backdrop-brightness-150 bg-base-100" : "bg-gradient-to-b from-base-100 via-transparent to-transparent"}
      `}
    >
      <div className="navbar lg:w-10/12 w-full mx-auto h-16">
        <div className="navbar-start">
          <a href="#" className="text-xl font-bold">
            aniHub
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>{isInView ? "yes" : "no  "}</a>
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
