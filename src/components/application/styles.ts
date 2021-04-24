import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme: any) => ({
  root: {},
  editButton: {
    cursor: "pointer",
  },
  success: {
    backgroundColor: theme.palette.success.main,
    color: "#fff",
  },
  warning: {
    backgroundColor: theme.palette.warning.main,
    color: "#fff",
  },
  secondary: {
    backgroundColor: theme.palette.secondary.main,
    color: "#fff",
  },
}));
