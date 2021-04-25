import CardClinicPicture from '../components/card-clinic-picture/CardClinicPicture';
import Page from '../components/Page';

import { makeStyles } from '@material-ui/core/styles';
import CardClinicDetail from '../components/card-clinic-detail/CardClinicDetail';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  detail_page_content: {
    display: 'grid',
    gridTemplateColumns: '40% 1fr',
    gap: '2rem',
    margin: '0 2rem',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'none',
      gridTemplateRows: 'repeat(2, min-content)',
    },
  },
  detail_clinic_picture: {},
  detail_clinic_detail: {},
}));

const ApplicationDetailPage: React.FC = () => {
  const classes = useStyles();
  return (
    <Page className={classes.root} title="Detail">
      <div className={classes.detail_page_content}>
        <div className={classes.detail_clinic_picture}>
          <CardClinicPicture />
        </div>
        <div className={classes.detail_clinic_detail}>
          <CardClinicDetail />
        </div>
      </div>
    </Page>
  );
};

export default ApplicationDetailPage;
