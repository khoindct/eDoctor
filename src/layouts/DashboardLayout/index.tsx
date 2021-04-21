import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/navigation/Header";
import Sidebar from "../../components/navigation/Sidebar";
import useStyles from "./styles";

const DashboardLayout: React.FC = () => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Header onMobileNavOpen={() => setMobileNavOpen(true)} />
      </div>
      <div className={classes.sidebar}>
        <Sidebar
          onMobileClose={() => setMobileNavOpen(false)}
          openMobile={isMobileNavOpen}
        />
      </div>
      <div className={classes.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
