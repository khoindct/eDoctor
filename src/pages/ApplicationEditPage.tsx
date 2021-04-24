import CardClinicForm from "../components/card-clinic-form/CardClinicForm";
import CardClinicPicture from "../components/card-clinic-picture/CardClinicPicture";
import Page from "../components/Page";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  edit_page_content: {
    display: "grid",
    gridTemplateColumns: "40% 1fr",
    gap: "2rem",
    margin: "0 2rem",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "none",
      gridTemplateRows: "repeat(2, min-content)",
    },
  },
  edit_clinic_picture: {},
  edit_clinic_form: {},
}));

const ApplicationEditPage: React.FC = () => {
  const classes = useStyles();
  return (
    <Page className={classes.root} title="Edit">
      <div className={classes.edit_page_content}>
        <div className={classes.edit_clinic_picture}>
          <CardClinicPicture />
        </div>
        <div className={classes.edit_clinic_form}>
          <CardClinicForm />
        </div>
      </div>
    </Page>
  );
};

export default ApplicationEditPage;
