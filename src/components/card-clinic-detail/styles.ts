import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme: any) => ({
  root: {
    borderRadius: '1rem',
    boxShadow: 'rgb(0 0 0 / 12%) 0px 1px 2px, rgb(0 0 0 / 5%) 0px 0px 0px 1px',
    fontWeight: 400,
    lineHeight: 1.43,
    color: 'rgb(107, 119, 140)',
  },
  button: {
    padding: '1rem',
  },
  details: {
    display: 'grid',
    gap: '1rem',
  },
  details_row: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 45%)',
    gap: '2rem',
    justifyContent: 'center',
  },
}));
