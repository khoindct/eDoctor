import { makeStyles } from "@material-ui/core";
import { Outlet } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    width: "100%",
    height: "100%",
    display: "flex",
  },
}));

const MainLayout: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Outlet />
    </div>
  );
};

export default MainLayout;
