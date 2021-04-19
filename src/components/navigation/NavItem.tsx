import { NavLink as RouterLink } from "react-router-dom";
import { Button, ListItem, makeStyles } from "@material-ui/core";

interface NavItemProps {
  path: string;
  title: string;
  icon: React.ElementType;
}

const useStyles = makeStyles((theme) => ({
  item: {
    display: "flex",
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: "flex-start",
    letterSpacing: 0,
    padding: "10px 8px",
    textTransform: "none",
    width: "100%",
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  title: {
    marginRight: "auto",
  },
  active: {
    color: theme.palette.primary.main,
    "& $title": {
      fontWeight: theme.typography.fontWeightMedium,
    },
    "& $icon": {
      color: theme.palette.primary.main,
    },
  },
}));

const NavItem: React.FC<NavItemProps> = ({ path, title, icon: Icon }) => {
  const classes = useStyles();

  return (
    <ListItem className={classes.item}>
      <Button
        activeClassName={classes.active}
        className={classes.button}
        component={RouterLink}
        to={path}
      >
        {Icon && <Icon className={classes.icon} size="20" />}
        <span className={classes.title}>{title}</span>
      </Button>
    </ListItem>
  );
};

export default NavItem;
