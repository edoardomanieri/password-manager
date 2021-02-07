import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Cookies from 'js-cookie';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(../../static/images/safecode.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function WebsitePasswordDetail(props) {
  const [open, setOpen] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [masterPassword, setMasterPassword] = useState("");
  const [plainPassword, setPlainPassword] = useState("*******");
  const classes = useStyles();
  const { website_name } = props.match.params;
  const { website_url } = props.location.state;
  const { username } = props.location.state;
  const { encryptedPassword } = props.location.state;
  const { notes } = props.location.state;
  const csrfToken = Cookies.get('csrftoken');


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEnteredPassword = () => {
    setOpen(false);
    Axios.post("/websitepasswords/get-password/",
    {
      'master_password': masterPassword,
      'encrypted_password': encryptedPassword
    },
    {
      headers: {
              Authorization: `JWT ${localStorage.getItem('token')}`,
              "Content-Type": "application/json",
              "X-CSRFToken": csrfToken
          }
  }
  )
  .then(response => {
    setPlainPassword(response.data.plain_password);
    setShowButton(false);
  })
  .catch(error => alert(error));
}


const ButtonDialog = () => {
  return (
    <div>
    <Button className={classes.submit} type="button" variant="contained" fullWidth color="primary" onClick={handleClickOpen}>
    Show Password
  </Button>
  <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">Show Password</DialogTitle>
    <DialogContent>
      <DialogContentText>
        To show the password for this website, please enter your email master password here.
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Master Password"
        type="password"
        fullWidth
        value={masterPassword}
        onChange={(e) => setMasterPassword(e.target.value)}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Button onClick={handleEnteredPassword} color="primary">
        Show Password
      </Button>
    </DialogActions>
  </Dialog>
  </div>
  )
}


  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {website_name} Details
        </Typography>
        <form className={classes.form} noValidate>
        <TextField
          id="outlined-read-only-input"
          label="Website Name"
          margin="normal"
          defaultValue={website_name}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-read-only-input"
          label="Website URL"
          margin="normal"
          defaultValue={website_url}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-read-only-input"
          label="Username"
          margin="normal"
          defaultValue={username}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
          <TextField
          id="outlined-read-only-input"
          label="Notes"
          margin="normal"
          multiline
          defaultValue={notes}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
          <TextField
          id="outlined-read-only-input"
          label="Password"
          margin="normal"
          multiline
          value={plainPassword}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <ButtonDialog />
        </form>
      </div>
      </Grid>
    </Grid>
  );
}
