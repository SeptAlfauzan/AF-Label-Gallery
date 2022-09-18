import { NextPage } from "next";
import React, { ReactNode } from "react";
import SideBar from "../../components/common/dashboard/Sidebar";

interface Props {
  children: ReactNode;
}

const AdminLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="h-screen w-full bg-zinc-50 flex flex-row relative">
      <SideBar />
      <div className="w-screen md:w-3/4 min-h-screen overflow-y-scroll flex flex-wrap px-10 md:px-[100px] py-10 gap-10">
        {children}
      </div>
    </div>
  );
};
export default AdminLayout;
