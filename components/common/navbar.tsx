import Link from "next/link";
import React from "react";
import { IoMenuSharp, IoClose } from "react-icons/io5";

const Navbar: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <div className="fixed top-0 md:top-0 right-0 z-20 md:w-full">
      <button
        className={`absolute block md:hidden bg-white rounded p-3 ${
          open ? null : "border"
        } right-10 z-10 mt-10`}
        onClick={() => setOpen(!open)}
      >
        {!open ? <IoMenuSharp size={24} /> : <IoClose size={24} />}
      </button>
      <ul
        className={`flex gap-5 flex-col md:flex-row h-screen md:h-fit bg-white w-[200px] md:w-full z-10 px-10 md:px-[200px] align-end text-right ${
          open ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0 transition-all duration-200 pt-40 md:pt-5 pb-5 shadow-lg md:shadow-sm`}
      >
        <li className="text-zinc-700 font-bold relative after:contents-[''] after:absolute  after:h-full after:-left-2 after:-right-2 after:-z-10 hover:after:bg-dark-blue hover:text-pink-300 duration-100 after:duration-100">
          <Link href={"/"}>AF Label</Link>
        </li>
        <li className="text-zinc-700 font-bold relative after:contents-[''] after:absolute  after:h-full after:-left-2 after:-right-2 after:-z-10 hover:after:bg-dark-blue hover:text-pink-300 duration-100 after:duration-100">
          <Link href={"/#about-us"}>About Us</Link>
        </li>
        <li className="text-zinc-700 font-bold relative after:contents-[''] after:absolute  after:h-full after:-left-2 after:-right-2 after:-z-10 hover:after:bg-dark-blue hover:text-pink-300 duration-100 after:duration-100">
          <Link href={"/collections"}>Collections</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
