import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  AppBar,
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
import { Menu as MenuIcon, Person as AccountIcon } from "@material-ui/icons";

import { notificationData } from "./data/headerData";
import Notification from "../notification/Notification";
import "./Header.scss";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import api from "../../api";
import { useQuery } from "react-query";

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
  const axios = api();
  const navigate = useNavigate();
  const { signout } = useActions();
  const [notifications] = useState<NotificationType[]>(notificationData);
  const [notificationsMenu, setNotificationsMenu] = useState<any>(null);
  const [profileMenu, setProfileMenu] = useState<any>(null);

  const { authenticated, authorization } = useTypedSelector(
    (state) => state.auth
  );

  const getCurrentUser = async () => {
    if (!authenticated) {
      return;
    }
    const { data } = await axios.get("/users/current-user");
    const result = data.data;

    return result;
  };

  const { isLoading, data: currentUser } = useQuery(
    ["user", authenticated],
    getCurrentUser,
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  );

  if (isLoading) {
    <AppBar position="fixed" className="app-bar"></AppBar>;
  }

  const handleSignout = () => {
    setProfileMenu(null);
    signout(() => navigate("/"));
  };

  const navigateToProfile = () => {
    navigate(`/profile/${currentUser._id}`);
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
          <img
            src={window.location.origin + "/assets/images/logo.png"}
            alt="application logo"
            height={50}
            width={50}
          />
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

        {authenticated && authorization !== "patient" && (
          <>
            <Button
              classes={{ root: "auth-button" }}
              variant="outlined"
              color="primary"
              onClick={handleSignout}
            >
              Sign Out
            </Button>
          </>
        )}

        {authenticated && authorization === "patient" && (
          <>
            <IconButton
              aria-haspopup="true"
              color="inherit"
              aria-controls="profile-menu"
              onClick={(e) => setProfileMenu(e.currentTarget)}
            >
              <Avatar
                classes={{ root: "header__avatar" }}
                alt="Remy Sharp"
                src={
                  currentUser?.avatar?.url ||
                  "../../assets/images/default-avatar.jpg"
                }
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
                  {currentUser?.name}
                </Typography>
              </div>
              <Divider />
              <div className="profile-header__item">
                {authorization === "patient" && (
                  <MenuItem
                    className="profile-header__item--content"
                    onClick={navigateToProfile}
                  >
                    <AccountIcon className="profile-header__item--icon" />{" "}
                    Profile
                  </MenuItem>
                )}
                {/* {authorization === "doctor" && (
                  <MenuItem
                    className="profile-header__item--content"
                    onClick={navigateToDashboard}
                  >
                    <AccountIcon className="profile-header__item--icon" />{" "}
                    Dashboard
                  </MenuItem>
                )}
                {authorization === "admin" && (
                  <MenuItem
                    className="profile-header__item--content"
                    onClick={navigateToDashboardAdmin}
                  >
                    <AccountIcon className="profile-header__item--icon" />{" "}
                    Dashboard
                  </MenuItem>
                )} */}
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
