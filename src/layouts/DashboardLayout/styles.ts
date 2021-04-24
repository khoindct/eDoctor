import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateRows: "64px calc(100vh - 64px)",
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
    alignSelf: "center",
    maxHeight: "calc(100vh - 64px)",
    [theme.breakpoints.down("md")]: {
      gridColumn: "1 / span 2",
    },
  },
}));
