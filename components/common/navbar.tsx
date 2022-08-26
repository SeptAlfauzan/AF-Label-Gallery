import React from "react";
import { IoMenuSharp } from "react-icons/io5";

const Navbar: React.FC = () => {
  return (
    <div className="fixed top-[32px] right-[32px]  z-20">
      <button className="bg-white rounded p-3 border">
        <IoMenuSharp size={24} />
      </button>
    </div>
  );
};

export default Navbar;
