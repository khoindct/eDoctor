import { Box, Container, makeStyles } from "@material-ui/core";
import ApplicationList from "../components/application/ApplicationList";
import Page from "../components/Page";
import customers from "../data/customer-data";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const ApplicationPage: React.FC = () => {
  const classes = useStyles();
  return (
    <Page className={classes.root} title="Applications">
      <Container maxWidth={false}>
        <Box mt={3}>
          <ApplicationList applications={customers} />
        </Box>
      </Container>
    </Page>
  );
};

export default ApplicationPage;
