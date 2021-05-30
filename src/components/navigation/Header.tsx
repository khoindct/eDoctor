import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
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
  Avatar,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  NotificationsNone as NotificationsIcon,
  Person as AccountIcon,
} from "@material-ui/icons";

import { notificationData } from "./data/headerData";
import Notification from "../notification/Notification";
import "./Header.scss";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";

interface HeaderProps {
  onMobileNavOpen?: () => void;
}

interface NotificationType {
  id: number;
  color: string;
  type?: string;
  message: string;
}

const Header: React.FC<HeaderProps> = ({ onMobileNavOpen }) => {
  const navigate = useNavigate();
  const { signout } = useActions();
  const [notifications] = useState<NotificationType[]>(notificationData);
  const [notificationsMenu, setNotificationsMenu] = useState<any>(null);
  const [isNotificationsUnread, setIsNotificationsUnread] = useState(true);
  const [profileMenu, setProfileMenu] = useState<any>(null);

  const { authenticated, authorization } = useTypedSelector(
    (state) => state.auth
  );

  const handleSignout = () => {
    setProfileMenu(null);
    signout(() => navigate("/"));
  };

  return (
    <AppBar position="fixed" className="app-bar">
      <Toolbar>
        {authenticated && authorization !== "patient" && (
          <Hidden lgUp>
            <IconButton color="inherit" onClick={onMobileNavOpen} className="">
              <MenuIcon />
            </IconButton>
          </Hidden>
        )}

        <RouterLink to="/">
          <img src="assets/images/logo.png" height={50} width={50} />
        </RouterLink>

        <Box flexGrow={1} />

        {!authenticated && (
          <>
            <Button
              classes={{ root: "auth-button" }}
              variant="outlined"
              color="primary"
              onClick={() => navigate("/login")}
            >
              Log In
            </Button>
            <Button
              classes={{ root: "auth-button" }}
              color="primary"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          </>
        )}

        {authenticated && (
          <>
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
                classes={{ badge: "header__badge" }}
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
              <Avatar
                classes={{ root: "header__avatar" }}
                alt="Remy Sharp"
                src="../../assets/images/default-avatar.jpg"
              />
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
              classes={{ paper: "profile-header" }}
              disableAutoFocusItem
              disableScrollLock
            >
              <div>
                <Typography variant="h6" className="profile-header__name">
                  John Smith
                </Typography>
              </div>
              <Divider />
              <div className="profile-header__item">
                <MenuItem className="profile-header__item--content">
                  <AccountIcon className="profile-header__item--icon" /> Profile
                </MenuItem>
                <MenuItem className="profile-header__item--content">
                  <AccountIcon className="profile-header__item--icon" /> Tasks
                </MenuItem>
                <MenuItem className="profile-header__item--content">
                  <AccountIcon className="profile-header__item--icon" />{" "}
                  Messages
                </MenuItem>
              </div>
              <div className="profile-header__button">
                <Button
                  variant="outlined"
                  color="primary"
                  size="medium"
                  fullWidth
                  className="profile-header__button--item"
                  onClick={handleSignout}
                >
                  Sign Out
                </Button>
              </div>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
