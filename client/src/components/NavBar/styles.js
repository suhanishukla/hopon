import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginLeft: '15px',
  },
  div: {
    padding: 0,
    fontFamily: "Poppins, sans-serif",
    fontWeight: 600,
  }
}));
