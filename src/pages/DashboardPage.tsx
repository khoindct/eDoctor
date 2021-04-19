import { Container, Grid, makeStyles } from "@material-ui/core";
import BarChart from "../components/dashboard/BarChart";
import PieChart from "../components/dashboard/PieChart";
import StatisticCard from "../components/dashboard/StatisticCard";
import Page from "../components/Page";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const DashboardPage = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <StatisticCard />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <StatisticCard />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <StatisticCard />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <StatisticCard />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <BarChart />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <PieChart />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default DashboardPage;
