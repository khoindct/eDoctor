import {
  Backdrop,
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import StatisticCard from "../components/dashboard/StatisticCard";
import DataList from "../components/data-list/DataList";
import Page from "../components/Page";
import moment from "moment";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "./DashboardPage.scss";
import { useQuery } from "react-query";
import api from "../api";
import AppointmentModalBodyDetail from "../components/AppointmentModalBodyDetail";
import { formatTime } from "../helpers/datetime-helper";

const DashboardPage = () => {
  const axios = api();
  // const [backdropOpen, setBackdropOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [appointment, setAppointment] = useState<any>();
  const open = Boolean(anchorEl);

  const getAppointments = async () => {
    const { data } = await axios.get("/bookings/users");

    const result = data.data.data;
    return result;
  };

  const { isLoading, data: clinicAppointments } = useQuery(
    "clinicAppointments",
    getAppointments,
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  );

  if (isLoading) {
    return (
      <Page className="" title="Dashboard">
        <Backdrop className="backdrop" open>
          <CircularProgress color="secondary" />
        </Backdrop>
      </Page>
    );
  }

  const handleOpenModal = (appId: any) => {
    const appointment = clinicAppointments.find((cl: any) => cl._id === appId);
    setAppointment(appointment);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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
      name: "bookedDate",
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
      name: "bookedTime",
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
          // const rowId = tableMeta.rowData[0];
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

  const getDataList = (list: any[]) => {
    if (!list?.length) {
      return [];
    }

    const chipStyle = new Map([
      ["pending", "chip-pending"],
      ["approved", "chip-success"],
      ["denied", "chip-cancel"],
    ]);

    const data = list.map((item) => {
      return {
        patient: <Typography variant="h5">{item.user.name}</Typography>,
        bookedDate: (
          <Typography variant="h5">
            {moment(item.bookedDate).format("DD-MM-YYYY")}
          </Typography>
        ),
        bookedTime: (
          <Typography variant="h5">{formatTime(item.bookedTime)}</Typography>
        ),
        status: (
          <Chip
            label={item.status[0].toUpperCase() + item.status.slice(1)}
            classes={{ root: chipStyle.get(item.status) }}
          />
        ),
        action: (
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={() => handleOpenModal(item._id)}
          >
            View Detail
          </Button>
        ),
      };
    });
    return data;
  };
  const dataList = getDataList(clinicAppointments);

  const totalPatient = clinicAppointments?.length;
  const totalAppointments = clinicAppointments?.length;
  const ratings = clinicAppointments?.clinic?.ratingAvg;

  return (
    <Page className="" title="Dashboard">
      <Box mt={5} />
      <Grid className="statistic-container" container justify="space-between">
        <Grid item xs={3}>
          <StatisticCard title="Total Patient" statistic={totalPatient} />
        </Grid>
        <Grid item xs={3}>
          <StatisticCard
            title="Total Appointments"
            statistic={totalAppointments}
          />
        </Grid>
        <Grid item xs={3}>
          <StatisticCard title="Ratings" statistic={ratings} />
        </Grid>
      </Grid>
      <Box mt={5} />
      <DataList data={dataList} columns={columns} title="Appointment List" />
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <React.Fragment>
          <AppointmentModalBodyDetail appointment={appointment} />
        </React.Fragment>
      </Modal>
    </Page>
  );
};

export default DashboardPage;
