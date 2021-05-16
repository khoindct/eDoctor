import ApplicationList from "../components/application/ApplicationList";
import Page from "../components/Page";
import customers from "../data/customer-data";
import "./ApplicationPage.scss";

const ApplicationPage: React.FC = () => {
  return (
    <Page className="" title="Applications">
      <ApplicationList applications={customers} />
    </Page>
  );
};

export default ApplicationPage;
