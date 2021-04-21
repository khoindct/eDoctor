import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateRows: "64px 1fr",
    gridTemplateColumns: "264px 1fr",
  },
  header: {
    gridRow: "span 1",
    gridColumn: "span 2",
  },
  sidebar: {
    gridRow: "2 / span 1",
    gridColumn: "span 1",
  },
  content: {
    gridRow: "2 / span 1",
    gridColumn: "2 / 3",
    [theme.breakpoints.down("md")]: {
      gridColumn: "1 / span 2",
    },
  },
}));
