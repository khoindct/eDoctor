import {
  Box,
  Chip,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import StatisticCard from "../components/dashboard/StatisticCard";
import DataList from "../components/data-list/DataList";
import Page from "../components/Page";
import moment from "moment";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "./DashboardPage.scss";

const DashboardPage = () => {
  // const [data, setData] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const options = ["Confirm", "Cancel"];
  const columns = [
    {
      name: "patient",
      label: "Patient",
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
      name: "bookTime",
      label: "Booking Time",
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
    {
      name: "actions",
      label: "Actions",
      options: {
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
          const rowId = tableMeta.rowData[0];
          return (
            <>
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
              >
                {options.map((option) => (
                  <MenuItem
                    className="menu-item-content"
                    key={option}
                    selected={option === "Pyxis"}
                    onClick={handleClose}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </>
          );
        },
      },
    },
  ];

  const dataList = [
    {
      patient: <Typography variant="h5">Joe James</Typography>,
      appDate: (
        <Typography variant="h5">
          {moment(Date.now()).format("DD-MM-YYYY")}
        </Typography>
      ),
      bookTime: (
        <Typography variant="h5">
          {moment(Date.now()).format("HH:mm")}
        </Typography>
      ),
      status: <Chip label="Confirm" classes={{ root: "chip-success" }} />,
    },
    {
      patient: <Typography variant="h5">Joe James</Typography>,
      appDate: (
        <Typography variant="h5">
          {moment(Date.now()).format("DD-MM-YYYY")}
        </Typography>
      ),
      bookTime: (
        <Typography variant="h5">
          {moment(Date.now()).format("HH:mm")}
        </Typography>
      ),
      status: <Chip label="Pending" classes={{ root: "chip-pending" }} />,
    },
    {
      patient: <Typography variant="h5">Joe James</Typography>,
      appDate: (
        <Typography variant="h5">
          {moment(Date.now()).format("DD-MM-YYYY")}
        </Typography>
      ),
      bookTime: (
        <Typography variant="h5">
          {moment(Date.now()).format("HH:mm")}
        </Typography>
      ),
      status: <Chip label="Cancelled" classes={{ root: "chip-cancel" }} />,
    },
    {
      patient: <Typography variant="h5">Joe James</Typography>,
      appDate: (
        <Typography variant="h5">
          {moment(Date.now()).format("DD-MM-YYYY")}
        </Typography>
      ),
      bookTime: (
        <Typography variant="h5">
          {moment(Date.now()).format("HH:mm")}
        </Typography>
      ),
      status: <Chip label="Cancelled" classes={{ root: "chip-cancel" }} />,
    },
  ];

  return (
    <Page className="" title="Dashboard">
      <Box mt={5} />
      <Grid className="statistic-container" container justify="space-between">
        <Grid item xs={3}>
          <StatisticCard title="Total Patient" statistic="1200" />
        </Grid>
        <Grid item xs={3}>
          <StatisticCard title="Total Appointments" statistic="1900" />
        </Grid>
        <Grid item xs={3}>
          <StatisticCard title="Ratings" statistic="60" />
        </Grid>
      </Grid>
      <Box mt={5} />
      <DataList data={dataList} columns={columns} title="Appointment List" />
    </Page>
  );
};

export default DashboardPage;
