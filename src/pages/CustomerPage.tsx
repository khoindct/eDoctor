import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Container,
  makeStyles,
} from "@material-ui/core";
import Page from "../components/Page";
import SearchIcon from "@material-ui/icons/Search";
import CustomerList from "../components/customer/CustomerList";
import customers from "../data/customer-data";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
}));

const CustomerPage: React.FC = () => {
  const classes = useStyles();
  return (
    <Page className={classes.root} title="Customers">
      <Container maxWidth={false}>
        <div>
          <Box display="flex" justifyContent="flex-end">
            <Button className={classes.importButton}>Import</Button>
            <Button className={classes.exportButton}>Export</Button>
            <Button color="primary" variant="contained">
              Add customer
            </Button>
          </Box>
          <Box mt={3}>
            <Card>
              <CardContent>
                <Box maxWidth={500}>
                  <TextField
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon fontSize="small" color="action">
                            <SearchIcon />
                          </SvgIcon>
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Search customer"
                    variant="outlined"
                  />
                </Box>
              </CardContent>
            </Card>
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
