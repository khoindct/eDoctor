import { Chip, Typography } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import "./AppointmentList.scss";
import moment from "moment";
import { formatTime } from "../../helpers/datetime-helper";

interface IAppointmentList {
  appointments: any[];
}

const columns = [
  {
    name: "clinic",
    label: "Clinic",
    options: {
      customBodyRender: (value: any) => {
        return (
          <Typography variant="h5" component="span">
            {value}
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
    name: "appDate",
    label: "Appointment Date",
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value: any) => {
        return (
          <Typography variant="h5" component="span">
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
    name: "bookedDate",
    label: "Booking Date",
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value: any) => {
        return (
          <Typography variant="h5" component="span">
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
        return (
          <Typography variant="h5" component="span">
            {formatTime(value)}
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
];

const AppointmentList: React.FC<IAppointmentList> = ({ appointments }) => {
  const getDataList = (list: any[]) => {
    if (!list?.length) {
      return [];
    }

    const data = list.map((appointment) => {
      const { bookedDate, bookedTime, clinic, status, createdAt } = appointment;
      return [clinic.name, createdAt, bookedDate, bookedTime, status];
    });
    return data;
  };

  const dataList = getDataList(appointments);

  return (
    <MUIDataTable
      title={"Appointment List"}
      data={dataList}
      columns={columns}
      options={{
        filterType: "textField",
        download: "false",
        selectableRows: "none",
      }}
    />
  );
};

export default AppointmentList;
