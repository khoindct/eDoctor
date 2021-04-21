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
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  NotificationsNone as NotificationsIcon,
  Person as AccountIcon,
} from "@material-ui/icons";

import useStyles from "./styles";

import { notificationData } from "./data/headerData";
import Notification from "../notification/Notification";

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
  const classes = useStyles();
  const navigate = useNavigate();
  const [notifications] = useState<NotificationType[]>(notificationData);
  const [notificationsMenu, setNotificationsMenu] = useState<any>(null);
  const [isNotificationsUnread, setIsNotificationsUnread] = useState(true);
  const [profileMenu, setProfileMenu] = useState<any>(null);

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
            className={classNames(
              classes.headerMenuButtonSandwich,
              classes.headerMenuButtonCollapse
            )}
          >
            <MenuIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse
                ),
              }}
            />
          </IconButton>
        </Hidden>

        <RouterLink to="/">
          <Typography variant="h6" className={classes.logotype}>
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
          className={classes.headerMenuButton}
        >
          <Badge
            color="secondary"
            badgeContent={isNotificationsUnread ? notifications.length : 0}
          >
            <NotificationsIcon classes={{ root: classes.headerIcon }} />
          </Badge>
        </IconButton>
        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={(e) => setProfileMenu(e.currentTarget)}
        >
          <AccountIcon classes={{ root: classes.headerIcon }} />
        </IconButton>
        <Menu
          id="notifications-menu"
          open={Boolean(notificationsMenu)}
          anchorEl={notificationsMenu}
          onClose={() => setNotificationsMenu(null)}
          className={classes.headerMenu}
          disableAutoFocusItem
          disableScrollLock
        >
          {notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              onClick={() => setNotificationsMenu(null)}
              className={classes.headerMenuItem}
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
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
          disableScrollLock
        >
          <div className={classes.profileMenuUser}>
            <Typography variant="h4">John Smith</Typography>
          </div>
          <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem
            )}
          >
            <AccountIcon className={classes.profileMenuIcon} /> Profile
          </MenuItem>
          <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem
            )}
          >
            <AccountIcon className={classes.profileMenuIcon} /> Tasks
          </MenuItem>
          <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem
            )}
          >
            <AccountIcon className={classes.profileMenuIcon} /> Messages
          </MenuItem>
          <div className={classes.profileMenuUser}>
            <Typography
              className={classes.profileMenuLink}
              color="primary"
              // onClick={() => signOut(userDispatch, props.history)}
              onClick={() => navigate("/login", { replace: true })}
            >
              Sign Out
            </Typography>
          </div>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
