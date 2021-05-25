import React from "react";
import { Drawer, Hidden } from "@material-ui/core";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import NavItem from "./NavItem";

interface SideBarProps {
  onMobileClose: () => void;
  openMobile: boolean;
  items: any[];
}

const drawerWidth = 256;
const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: drawerWidth,
  },
  desktopDrawer: {
    width: drawerWidth,
    top: 64,
    height: "calc(100% - 64px)",
  },
}));

const Sidebar: React.FC<SideBarProps> = ({
  openMobile = false,
  onMobileClose,
  items,
}) => {
  const classes = useStyles();

  const drawerItems = (
    <List disablePadding>
      {items.map((item, index) => {
        return (
          <NavItem
            key={index}
            icon={item.icon}
            title={item.title}
            path={item.path}
          />
        );
      })}
    </List>
  );

  return (
    <React.Fragment>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {drawerItems}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{
            paper: classes.desktopDrawer,
            root: classes.desktopDrawer,
          }}
          open
          variant="persistent"
        >
          {drawerItems}
        </Drawer>
      </Hidden>
    </React.Fragment>
  );
};

export default Sidebar;
