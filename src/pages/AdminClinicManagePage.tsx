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
import "./AdminDoctorManagePage.scss";
import { useQuery } from "react-query";
import api from "../api";
import ClinicModalBodyDetail from "../components/ClinicModalBodyDetail";

const AdminClinicManagePage = () => {
  const axios = api();
  const [backdropOpen] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);
  const [clinic, setClinic] = useState<any>();

  const getAllClinics = async () => {
    const { data } = await axios.get("/clinics");
    const result = data.data.data;
    return result;
  };

  const { isLoading, data: clinics } = useQuery("allClinics", getAllClinics, {
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });

  if (isLoading) {
    return (
      <Page className="" title="Dashboard">
        <Backdrop className="backdrop" open>
          <CircularProgress color="secondary" />
        </Backdrop>
      </Page>
    );
  }

  const handleOpenModal = (clinicId: any) => {
    const clinic = clinics.find((cl: any) => cl._id === clinicId);
    setClinic(clinic);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const columns = [
    {
      name: "name",
      label: "Name",
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
      name: "phone",
      label: "Phone",
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
      name: "address",
      label: "Address",
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
      name: "action",
      label: "Action",
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
        name: <Typography variant="h5">{item.name}</Typography>,
        phone: <Typography variant="h5">{item.phone}</Typography>,
        address: <Typography variant="h5">{item.address}</Typography>,
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
  const dataList = getDataList(clinics);

  const clinicsPending = clinics.filter(
    (clinic: any) => clinic.status === "pending"
  ).length;
  const clinicsApproved = clinics.filter(
    (clinic: any) => clinic.status === "approved"
  ).length;
  const clinicsDenied = clinics.filter(
    (clinic: any) => clinic.status === "denied"
  ).length;

  return (
    <Page className="" title="Dashboard">
      <Backdrop className="backdrop" open={backdropOpen}>
        <CircularProgress color="secondary" />
      </Backdrop>
      <Box mt={5} />
      <Grid className="statistic-container" container justify="space-between">
        <Grid item xs={3}>
          <StatisticCard title="Pending" statistic={clinicsPending} />
        </Grid>
        <Grid item xs={3}>
          <StatisticCard title="Approved" statistic={clinicsApproved} />
        </Grid>
        <Grid item xs={3}>
          <StatisticCard title="Denied" statistic={clinicsDenied} />
        </Grid>
      </Grid>
      <Box mt={5} />
      <DataList data={dataList} columns={columns} title="Clinic List" />
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <React.Fragment>
          <ClinicModalBodyDetail
            clinic={clinic}
            handleCloseModal={handleCloseModal}
          />
        </React.Fragment>
      </Modal>
    </Page>
  );
};

export default AdminClinicManagePage;
