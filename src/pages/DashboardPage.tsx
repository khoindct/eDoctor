import {
  Backdrop,
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  Modal,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import StatisticCard from "../components/dashboard/StatisticCard";
import DataList from "../components/data-list/DataList";
import Page from "../components/Page";
import moment from "moment";
import "./DashboardPage.scss";
import { useQuery } from "react-query";
import api from "../api";
import AppointmentModalBodyDetail from "../components/AppointmentModalBodyDetail";
import { formatTime } from "../helpers/datetime-helper";

const DashboardPage = () => {
  const axios = api();
  const [openModal, setOpenModal] = useState(false);
  const [appointment, setAppointment] = useState<any>();

  const getAppointments = async () => {
    const { data } = await axios.get("/bookings/users");

    const result = data.data.data;
    return result;
  };

  const getClinicStatistics = async () => {
    const { data } = await axios.get("/clinics/detail/statistic");

    const result = data.data;
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

  const { isLoading: isClinicStatisticsLoading, data: clinicStatistics } =
    useQuery("clinicStatistics", getClinicStatistics, {
      refetchOnWindowFocus: false,
      refetchInterval: false,
    });

  if (isLoading || isClinicStatisticsLoading) {
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

  const columns = [
    {
      name: "patient",
      label: "Patient",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: any) => {
          return <Typography variant="h5">{value}</Typography>;
        },
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
        filter: false,
        sort: false,
        customBodyRender: (value: any) => {
          return (
            <Typography variant="h5">
              {moment(value).format("DD-MM-YYYY")}
            </Typography>
          );
        },
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
        filter: false,
        sort: false,
        customBodyRender: (value: any) => {
          return <Typography variant="h5">{formatTime(value)}</Typography>;
        },
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
        sort: true,
        customBodyRender: (value: any) => {
          const chipStyle = new Map([
            ["pending", "chip-pending"],
            ["approved", "chip-success"],
            ["denied", "chip-cancel"],
          ]);

          return (
            <Chip
              label={value[0].toUpperCase() + value.slice(1)}
              classes={{ root: chipStyle.get(value) }}
            />
          );
        },
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
        filter: false,
        sort: false,
        customBodyRender: (value: any) => {
          return (
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              onClick={() => handleOpenModal(value)}
            >
              View Detail
            </Button>
          );
        },
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

  const getDataList = (list: any[]) => {
    if (!list?.length) {
      return [];
    }

    const data = list.map((item) => {
      return [
        item.user.name,
        item.bookedDate,
        item.bookedTime,
        item.status,
        item._id,
      ];
    });
    return data;
  };

  // const dataList = getDataList(clinicAppointments);
  const dataList = getDataList(clinicAppointments);

  const totalPatient = clinicStatistics?.totalPatients;
  const totalAppointments = clinicAppointments?.length;
  const ratings = clinicStatistics?.ratings;

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
        className="appointment-modal"
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <React.Fragment>
          <AppointmentModalBodyDetail
            appointment={appointment}
            handleCloseModal={handleCloseModal}
          />
        </React.Fragment>
      </Modal>
    </Page>
  );
};

export default DashboardPage;
