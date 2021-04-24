import { Box, Button, Container, makeStyles } from "@material-ui/core";
import Page from "../components/Page";
import CustomerList from "../components/customer/CustomerList";
import customers from "../data/customer-data";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const CustomerPage: React.FC = () => {
  const classes = useStyles();
  return (
    <Page className={classes.root} title="Customers">
      <Container maxWidth={false}>
        <div>
          <Box display="flex" justifyContent="flex-end">
            <Button color="primary" variant="contained">
              Add customer
            </Button>
          </Box>
        </div>

        <Box mt={3}>
          <CustomerList customers={customers} />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerPage;
