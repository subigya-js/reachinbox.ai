import React from "react";
import reachlogo from "../images/reachlogo.png";

const Header = () => {
  return (
    <>
      <div className="h-[10vh] bg-black flex justify-center items-center border-b border-gray-400">
        <img src={reachlogo} alt="Reachinbox Logo" className="h-12"/>
      </div>
    </>
  );
};

export default Header;
