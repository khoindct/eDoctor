import { Button } from "@material-ui/core";
import Page from "../components/Page";
import CustomerList from "../components/customer/CustomerList";
import customers from "../data/customer-data";
import "./PatientPage.scss";

const PatientPage: React.FC = () => {
  return (
    <Page className="" title="Customers">
      <div>
        <Button color="primary" variant="contained">
          Add customer
        </Button>
      </div>

      <CustomerList customers={customers} />
    </Page>
  );
};

export default PatientPage;
