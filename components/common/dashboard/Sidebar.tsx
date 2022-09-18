import React from "react";

import { IoMenuOutline } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/router";

const SideBar: React.FC = () => {
  const [minimize, setMinimize] = React.useState<boolean>(true);
  const [active, setActive] = React.useState<string>("");
  const router = useRouter();

  React.useEffect(() => {
    setActive(router.route.split("/")[2]);
  }, [router.route]);

  return (
    <nav
      className={` fixed md:relative ${
        !minimize ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 duration-300 transition-all md:w-1/4 h-full bg-white flex flex-col items-center py-10 px-10 z-10 shadow-lg md:shadow-none`}
    >
      <button
        className={`absolute md:hidden p-2 bg-white rounded z-10 top-5 ${
          !minimize ? "right-5" : "-right-10"
        }`}
        onClick={() => setMinimize(!minimize)}
      >
        <IoMenuOutline />
      </button>
      {/* name section */}
      <>
        <div className="w-20 h-20 rounded-full bg-zinc-200 relative">
          <div className="bg-green-400 border-2 border-white w-3 h-3 rounded-full absolute bottom-0 right-[14%]" />
        </div>
        <h3 className="text-black font-bold text-lg capitalize">
          {"No Username"}
        </h3>
        <h5 className="text-zinc-300">{"admin.username"}</h5>
      </>
      {/* menu */}
      <ul className="w-full border-t-2 border-r-zinc-400 pt-10 mt-10 flex flex-col gap-4">
        <SideBarLink name="dashboard" active={active} href="/admin/dashboard" />
        <SideBarLink name="products" active={active} href="/admin/products" />
        <SideBarLink
          name="categories"
          active={active}
          href="/admin/categories"
        />
        <li
          className={`hover:bg-gradient-to-br from-purple-600 to-pink-500 py-1 px-4 rounded-full hover:text-white text-black bg-white duration-250 transition-all cursor-pointer`}
        >
          Logout
        </li>
      </ul>
    </nav>
  );
};

interface SideBarLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  name: string;
  active: string;
}

const SideBarLink: React.FC<SideBarLinkProps> = (props) => {
  return (
    <Link href={props.href}>
      <li
        className={` ${
          props.active === props.name
            ? "bg-gradient-to-br from-purple-600 to-pink-500 text-white"
            : "bg-white text-black"
        } hover:bg-gradient-to-br from-purple-600 to-pink-500 py-1 px-4 rounded-full hover:text-white duration-250 transition-all cursor-pointer capitalize`}
      >
        {props.name}
      </li>
    </Link>
  );
};

export default SideBar;
