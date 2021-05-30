import { Chip, Typography } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import "./AppointmentList.scss";
import moment from "moment";

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

const AppointmentList: React.FC = () => {
  const data = [
    {
      clinic: (
        <Typography variant="h5" component="span">
          Joe James
        </Typography>
      ),
      appDate: (
        <Typography variant="h5" component="span">
          {moment(Date.now()).format("DD-MM-YYYY")}
        </Typography>
      ),
      bookDate: (
        <Typography variant="h5" component="span">
          {moment(Date.now()).format("DD-MM-YYYY")}
        </Typography>
      ),
      status: <Chip label="Confirm" classes={{ root: "chip-success" }} />,
    },
    {
      clinic: (
        <Typography variant="h5" component="span">
          Joe James
        </Typography>
      ),
      appDate: (
        <Typography variant="h5" component="span">
          {moment(Date.now()).format("DD-MM-YYYY")}
        </Typography>
      ),
      bookDate: (
        <Typography variant="h5" component="span">
          {moment(Date.now()).format("DD-MM-YYYY")}
        </Typography>
      ),
      status: <Chip label="Pending" classes={{ root: "chip-pending" }} />,
    },
    {
      clinic: (
        <Typography variant="h5" component="span">
          Joe James
        </Typography>
      ),
      appDate: (
        <Typography variant="h5" component="span">
          {moment(Date.now()).format("DD-MM-YYYY")}
        </Typography>
      ),
      bookDate: (
        <Typography variant="h5" component="span">
          {moment(Date.now()).format("DD-MM-YYYY")}
        </Typography>
      ),
      status: <Chip label="Cancelled" classes={{ root: "chip-cancel" }} />,
    },
    {
      clinic: (
        <Typography variant="h5" component="span">
          Joe James
        </Typography>
      ),
      appDate: (
        <Typography variant="h5" component="span">
          {moment(Date.now()).format("DD-MM-YYYY")}
        </Typography>
      ),
      bookDate: (
        <Typography variant="h5" component="span">
          {moment(Date.now()).format("DD-MM-YYYY")}
        </Typography>
      ),
      status: <Chip label="Cancelled" classes={{ root: "chip-cancel" }} />,
    },
  ];

  return (
    <MUIDataTable
      title={"Appointment List"}
      data={data}
      columns={columns}
      options={{
        filterType: "textField",
        download: "false",
      }}
    />
  );
};

export default AppointmentList;
