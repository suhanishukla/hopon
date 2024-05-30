import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
  },
  formContainer: {
    flex: 1,
    padding: theme.spacing(2),
    margin: '20px',
    backgroundColor: 'rgba(192, 192, 192, 0.2)',
  },
  mapContainer: {
    flex: 2,
    padding: theme.spacing(2),
    margin: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  paper: {
    padding: theme.spacing(2),
    margin: '20px 0',
  },
  createButton: {
    backgroundColor: '#3d2814',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    fontFamily: '"Poppins", sans-serif',
    fontWeight: '600',
    width: '100%',
    marginTop: '20px',
    cursor: 'pointer',
  }
}));

export default useStyles;
