import StatisticCard from "../components/dashboard/StatisticCard";
import Page from "../components/Page";
import "./DashboardPage.scss";

const DashboardPage = () => {
  return (
    <Page className="" title="Dashboard">
      <StatisticCard />
      <StatisticCard />
      <StatisticCard />
    </Page>
  );
};

export default DashboardPage;
