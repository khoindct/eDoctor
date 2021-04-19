import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import {
  AppBar,
  Badge,
  Box,
  Button,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";

interface HeaderProps {
  onMobileNavOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMobileNavOpen }) => {
  const navigate = useNavigate();
  const [notifications] = useState([]);

  return (
    <AppBar elevation={0}>
      <Toolbar>
        <RouterLink to="/">
          <Typography>LOGO</Typography>
        </RouterLink>

        <Box flexGrow={1} />

        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Button
            color="inherit"
            startIcon={<InputIcon />}
            onClick={() => navigate("/login", { replace: true })}
          >
            LOG OUT
          </Button>
        </Hidden>

        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
