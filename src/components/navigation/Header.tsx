import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import classNames from "classnames";

import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Divider,
  Button,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  NotificationsNone as NotificationsIcon,
  Person as AccountIcon,
} from "@material-ui/icons";

import { notificationData } from "./data/headerData";
import Notification from "../notification/Notification";
import "./Header.scss";

interface HeaderProps {
  onMobileNavOpen: () => void;
}

interface NotificationType {
  id: number;
  color: string;
  type?: string;
  message: string;
}

const Header: React.FC<HeaderProps> = ({ onMobileNavOpen }) => {
  const navigate = useNavigate();
  const [notifications] = useState<NotificationType[]>(notificationData);
  const [notificationsMenu, setNotificationsMenu] = useState<any>(null);
  const [isNotificationsUnread, setIsNotificationsUnread] = useState(true);
  const [profileMenu, setProfileMenu] = useState<any>(null);

  return (
    <AppBar position="fixed" className="app-bar">
      <Toolbar>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen} className="">
            <MenuIcon />
          </IconButton>
        </Hidden>

        <RouterLink to="/">
          <Typography variant="h6" className="">
            LOGO
          </Typography>
        </RouterLink>

        <Box flexGrow={1} />

        <IconButton
          color="inherit"
          aria-haspopup="true"
          aria-controls="mail-menu"
          onClick={(e) => {
            setNotificationsMenu(e.currentTarget);
            setIsNotificationsUnread(false);
          }}
        >
          <Badge
            color="secondary"
            badgeContent={isNotificationsUnread ? notifications.length : 0}
          >
            <NotificationsIcon className="header__menu-button" />
          </Badge>
        </IconButton>
        <IconButton
          aria-haspopup="true"
          color="inherit"
          aria-controls="profile-menu"
          onClick={(e) => setProfileMenu(e.currentTarget)}
        >
          <AccountIcon className="header__menu-button" />
        </IconButton>
        <Menu
          id="notifications-menu"
          open={Boolean(notificationsMenu)}
          anchorEl={notificationsMenu}
          onClose={() => setNotificationsMenu(null)}
          className=""
          disableAutoFocusItem
          disableScrollLock
        >
          {notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              onClick={() => setNotificationsMenu(null)}
              className=""
            >
              <Notification {...notification} typographyVariant="inherit" />
            </MenuItem>
          ))}
        </Menu>
        <Menu
          id="profile-menu"
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
          classes={{ paper: "profile" }}
          disableAutoFocusItem
          disableScrollLock
        >
          <div>
            <Typography variant="h6" className="profile__name">
              John Smith
            </Typography>
          </div>
          <Divider />
          <div className="profile__item">
            <MenuItem className="profile__item--content">
              <AccountIcon className="profile__item--icon" /> Profile
            </MenuItem>
            <MenuItem className="profile__item--content">
              <AccountIcon className="profile__item--icon" /> Tasks
            </MenuItem>
            <MenuItem className="profile__item--content">
              <AccountIcon className="profile__item--icon" /> Messages
            </MenuItem>
          </div>
          <div className="profile__button">
            <Button
              variant="outlined"
              color="primary"
              size="medium"
              fullWidth
              className="profile__button--item"
              // onClick={() => signOut(userDispatch, props.history)}
              onClick={() => navigate("/login", { replace: true })}
            >
              Sign Out
            </Button>
          </div>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
