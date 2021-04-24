import React from "react";
import { makeStyles, Grid } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import MUIDataTable from "mui-datatables";

interface CustomerListProps {
  customers: {
    id: string;
    address: {
      country: string;
      state: string;
      city: string;
      street: string;
    };
    avatarUrl: string;
    email: string;
    name: string;
    phone: string;
  }[];
}

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2),
  },
  editButton: {
    cursor: "pointer",
  },
}));

const datatableData = [
  ["Joe James", "Example Inc.", "Yonkers", "NY"],
  ["John Walsh", "Example Inc.", "Hartford", "CT"],
  ["Bob Herm", "Example Inc.", "Tampa", "FL"],
  ["James Houston", "Example Inc.", "Dallas", "TX"],
  ["Prabhakar Linwood", "Example Inc.", "Hartford", "CT"],
  ["Kaui Ignace", "Example Inc.", "Yonkers", "NY"],
  ["Esperanza Susanne", "Example Inc.", "Hartford", "CT"],
  ["Christian Birgitte", "Example Inc.", "Tampa", "FL"],
  ["Meral Elias", "Example Inc.", "Hartford", "CT"],
  ["Deep Pau", "Example Inc.", "Yonkers", "NY"],
  ["Sebastiana Hani", "Example Inc.", "Dallas", "TX"],
  ["Marciano Oihana", "Example Inc.", "Yonkers", "NY"],
  ["Brigid Ankur", "Example Inc.", "Dallas", "TX"],
  ["Anna Siranush", "Example Inc.", "Yonkers", "NY"],
  ["Avram Sylva", "Example Inc.", "Hartford", "CT"],
  ["Serafima Babatunde", "Example Inc.", "Tampa", "FL"],
  ["Gaston Festus", "Example Inc.", "Tampa", "FL"],
];

const CustomerList: React.FC<CustomerListProps> = ({ customers }) => {
  const classes = useStyles();

  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "company",
      label: "Company",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "city",
      label: "City",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "state",
      label: "State",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "actions",
      label: "Actions",
      options: {
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
          return (
            <EditIcon
              className={classes.editButton}
              onClick={() => console.log(value, tableMeta)}
            />
          );
        },
      },
    },
  ];

  return (
    <React.Fragment>
      Tables
      <Grid container spacing={4} className={classes.root}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Employee List"
            data={datatableData}
            columns={columns}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CustomerList;
