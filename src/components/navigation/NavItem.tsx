import { NavLink as RouterLink } from "react-router-dom";
import { Button, ListItem } from "@material-ui/core";
import "./NavItem.scss";

interface NavItemProps {
  path: string;
  title: string;
  icon: React.ElementType;
}

const NavItem: React.FC<NavItemProps> = ({ path, title, icon: Icon }) => {
  return (
    <ListItem className="item">
      <Button
        activeClassName="active"
        className="button"
        component={RouterLink}
        to={path}
      >
        {Icon && <Icon className="icon" />}
        <span className="title">{title}</span>
      </Button>
    </ListItem>
  );
};

export default NavItem;
