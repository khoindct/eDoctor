import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/navigation/Header";
import Sidebar from "../../components/navigation/Sidebar";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import MapIcon from "@material-ui/icons/Map";
import EventIcon from "@material-ui/icons/Event";
import SettingsIcon from "@material-ui/icons/Settings";
import StarRateIcon from "@material-ui/icons/StarRate";
import "./index.scss";
import { useTypedSelector } from "../../hooks/useTypedSelector";
const DashboardLayout: React.FC = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const { authorization } = useTypedSelector((state) => state.auth);

  const sidebarItems = [
    authorization === "admin" && {
      path: "/app/map",
      icon: MapIcon,
      title: "Map",
    },
    authorization === "doctor" && {
      path: "/app/dashboard",
      icon: DashboardIcon,
      title: "Dashboard",
    },
    authorization === "doctor" && {
      path: "/app/patients",
      icon: PeopleAltIcon,
      title: "Patients",
    },
    authorization === "doctor" && {
      path: "/app/ratings",
      icon: StarRateIcon,
      title: "Ratings",
    },
    authorization === "doctor" && {
      path: "/app/calendar",
      icon: EventIcon,
      title: "Calendar",
    },
    authorization === "doctor" && {
      path: "/app/settings",
      icon: SettingsIcon,
      title: "Settings",
    },
  ].filter(Boolean);

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
