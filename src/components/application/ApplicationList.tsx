import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Chip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import MUIDataTable from 'mui-datatables';

// styles
import useStyles from './styles';

const states: { [key: string]: 'success' | 'warning' | 'secondary' } = {
  approved: 'success',
  pending: 'warning',
  declined: 'secondary',
};

const ApplicationList: React.FC<any> = ({ applications }) => {
  const classes = useStyles();
  let navigate = useNavigate();

  const columns = [
    {
      name: 'id',
      options: {
        display: false,
      },
    },
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'company',
      label: 'Company',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'city',
      label: 'City',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'actions',
      label: 'Actions',
      options: {
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
          const rowId = tableMeta.rowData[0];
          return (
            <EditIcon
              className={classes.editButton}
              onClick={() => navigate(`/app/applications/${rowId}/detail`)}
            />
          );
        },
      },
    },
  ];

  const datatableData = [
    {
      id: '1',
      name: 'Bệnh viện trung ương',
      company: 'Example Inc.',
      city: 'Yonkers',
      status: <Chip label="Approved" classes={{ root: classes['success'] }} />,
    },
    {
      id: '2',
      name: 'Đa khoa thành phố',
      company: 'Example Inc.',
      city: 'Yonkers',
      status: <Chip label="Pending" classes={{ root: classes['warning'] }} />,
    },
    {
      id: '3',
      name: 'Huyết học',
      company: 'Example Inc.',
      city: 'Yonkers',
      status: (
        <Chip label="Declined" classes={{ root: classes['secondary'] }} />
      ),
    },
  ];

  return (
    <React.Fragment>
      <Grid container spacing={4} className={classes.root}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Application List"
            data={datatableData}
            columns={columns}
            options={{
              filterType: 'checkbox',
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ApplicationList;
