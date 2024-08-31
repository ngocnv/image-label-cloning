import React from "react";
import {Outlet} from "react-router-dom";
import Sidebar from "./Menu";

const MainLayout = () => {
  return (
        <div>
            <Sidebar/>
            <div >
                <Outlet/>
            </div>
        </div>
  );
};

export default MainLayout;