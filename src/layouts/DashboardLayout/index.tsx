import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/navigation/Header";
import Sidebar from "../../components/navigation/Sidebar";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import MapIcon from "@material-ui/icons/Map";
import EventIcon from "@material-ui/icons/Event";
import AssignmentIcon from "@material-ui/icons/Assignment";
import "./index.scss";
const DashboardLayout: React.FC = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  const sidebarItems = [
    {
      path: "/app/dashboard",
      icon: DashboardIcon,
      title: "Dashboard",
    },
    {
      path: "/app/applications",
      icon: AssignmentIcon,
      title: "Applications",
    },
    {
      path: "/app/customers",
      icon: PeopleAltIcon,
      title: "Customers",
    },
    {
      path: "/app/map",
      icon: MapIcon,
      title: "Map",
    },
    {
      path: "/app/calendar",
      icon: EventIcon,
      title: "Calendar",
    },
  ];

  return (
    <>
      <Header onMobileNavOpen={() => setMobileNavOpen(true)} />
      <div className="container">
        <div className="sidebar">
          <Sidebar
            onMobileClose={() => setMobileNavOpen(false)}
            openMobile={isMobileNavOpen}
            items={sidebarItems}
          />
        </div>
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
