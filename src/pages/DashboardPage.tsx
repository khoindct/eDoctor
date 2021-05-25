import { Box, Chip, Grid, Typography } from "@material-ui/core";
import { useState } from "react";
import StatisticCard from "../components/dashboard/StatisticCard";
import DataList from "../components/data-list/DataList";
import Page from "../components/Page";
import moment from "moment";
import "./DashboardPage.scss";

const columns = [
  {
    name: "clinic",
    label: "Clinic",
    options: {
      filter: true,
      sort: false,
      setCellHeaderProps: (value: any) => {
        return {
          style: {
            fontSize: "1.5rem",
          },
        };
      },
    },
  },
  {
    name: "appDate",
    label: "Appointment Date",
    options: {
      filter: true,
      sort: false,
      setCellHeaderProps: (value: any) => {
        return {
          style: {
            fontSize: "1.5rem",
          },
        };
      },
    },
  },
  {
    name: "bookDate",
    label: "Booking Date",
    options: {
      filter: true,
      sort: false,
      setCellHeaderProps: (value: any) => {
        return {
          style: {
            fontSize: "1.5rem",
          },
        };
      },
    },
  },
  {
    name: "status",
    label: "Status",
    options: {
      filter: true,
      sort: false,
      setCellHeaderProps: (value: any) => {
        return {
          style: {
            fontSize: "1.5rem",
          },
        };
      },
    },
  },
];

const dataList = [
  {
    clinic: <Typography variant="h5">Joe James</Typography>,
    appDate: (
      <Typography variant="h5">
        {moment(Date.now()).format("DD-MM-YYYY")}
      </Typography>
    ),
    bookDate: (
      <Typography variant="h5">
        {moment(Date.now()).format("DD-MM-YYYY")}
      </Typography>
    ),
    status: <Chip label="Confirm" classes={{ root: "chip-success" }} />,
  },
  {
    clinic: <Typography variant="h5">Joe James</Typography>,
    appDate: (
      <Typography variant="h5">
        {moment(Date.now()).format("DD-MM-YYYY")}
      </Typography>
    ),
    bookDate: (
      <Typography variant="h5">
        {moment(Date.now()).format("DD-MM-YYYY")}
      </Typography>
    ),
    status: <Chip label="Pending" classes={{ root: "chip-pending" }} />,
  },
  {
    clinic: <Typography variant="h5">Joe James</Typography>,
    appDate: (
      <Typography variant="h5">
        {moment(Date.now()).format("DD-MM-YYYY")}
      </Typography>
    ),
    bookDate: (
      <Typography variant="h5">
        {moment(Date.now()).format("DD-MM-YYYY")}
      </Typography>
    ),
    status: <Chip label="Cancelled" classes={{ root: "chip-cancel" }} />,
  },
  {
    clinic: <Typography variant="h5">Joe James</Typography>,
    appDate: (
      <Typography variant="h5">
        {moment(Date.now()).format("DD-MM-YYYY")}
      </Typography>
    ),
    bookDate: (
      <Typography variant="h5">
        {moment(Date.now()).format("DD-MM-YYYY")}
      </Typography>
    ),
    status: <Chip label="Cancelled" classes={{ root: "chip-cancel" }} />,
  },
];

const DashboardPage = () => {
  const [data, setData] = useState(dataList);

  return (
    <Page className="" title="Dashboard">
      <Box mt={5} />
      <Grid className="statistic-container" container justify="space-between">
        <Grid xs={3}>
          <StatisticCard title="Total Patient" statistic="1200" />
        </Grid>
        <Grid xs={3}>
          <StatisticCard title="Total Appointments" statistic="1900" />
        </Grid>
        <Grid xs={3}>
          <StatisticCard title="Ratings" statistic="60" />
        </Grid>
      </Grid>
      <Box mt={5} />
      <DataList data={data} columns={columns} title="Appointment List" />
    </Page>
  );
};

export default DashboardPage;
