import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    margin: '0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'left',
    backgroundColor: '#3d2814',
  },
  image: {
    marginLeft: '15px',
  },
  div: {
    padding: 0,
    fontFamily: "Poppins, sans-serif",
    fontWeight: 600,
  },
  typography: {
    color: '#fff',
    fontFamily: "Poppins, sans-serif",
    fontWeight: 600,
  },
  button: {
    color: '#fff',
  },
}));

export default useStyles;
