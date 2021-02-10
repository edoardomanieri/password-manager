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
  const [openShow, setOpenShow] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [isPasswordPlain, setIsPasswordPlain] = useState(false);
  const [masterPassword, setMasterPassword] = useState("");
  const [plainPassword, setPlainPassword] = useState("**********");
  const classes = useStyles();

  const { id } = props.location.state;
  const { website_name } = props.match.params;
  const { website_url } = props.location.state;
  const { username } = props.location.state;
  const { encryptedPassword } = props.location.state;
  const { notes } = props.location.state;
  const csrfToken = Cookies.get('csrftoken');


  const handleClickOpenShow = () => {
    if (!isPasswordPlain)
      setOpenShow(true);
  };

  const handleCloseShow = () => {
    setOpenShow(false);
  };

  const handleEnteredPassword = () => {
    setOpenShow(false);
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
    setIsPasswordPlain(true);
  })
  .catch(error => alert(error));
}

const handleClickOpenUpdate = () => {
  if (!isPasswordPlain)
    setOpenUpdate(true);
};

const handleCloseUpdate = () => {
  setOpenUpdate(false);
};


const handleUpdate = () => {
  setOpenUpdate(false);
  Axios.put(`/websitepasswords/update-website-password/${id}`,
  {
    'website_url': website_url,
    'website_name': website_name,
    'username': username,
    'password': plainPassword,
    'notes': notes,
    'master_password': masterPassword
  },
  {
    headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken
        }
}
)
.then(response => console.log("ok"))
.catch(error => alert(error));
}


const ButtonDialogUpdate = () => {
  return (
    <div>
    <Button className={classes.submit} type="button" variant="contained" fullWidth color="primary" onClick={handleClickOpenUpdate}>
    update details
  </Button>
  <Dialog open={openUpdate} onClose={handleCloseUpdate} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">Update Details</DialogTitle>
    <DialogContent>
      <DialogContentText>
        To update the details for this website, please enter your master password here.
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
      <Button onClick={handleCloseUpdate} color="primary">
        Cancel
      </Button>
      <Button onClick={handleUpdate} color="primary">
        Update
      </Button>
    </DialogActions>
  </Dialog>
  </div>
  )
}


const ButtonDialogShow = () => {
  return (
    <div>
    <Button className={classes.submit} type="button" variant="contained" fullWidth color="primary" onClick={handleClickOpenShow}>
    Show Password
  </Button>
  <Dialog open={openShow} onClose={handleCloseShow} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">Show Password</DialogTitle>
    <DialogContent>
      <DialogContentText>
        To show the password for this website, please enter your master password here.
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
      <Button onClick={handleCloseShow} color="primary">
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
          id="webname"
          label="Website Name"
          margin="normal"
          defaultValue={website_name}
          fullWidth
          variant="outlined"
        />
        <TextField
          id="weburl"
          label="Website URL"
          margin="normal"
          defaultValue={website_url}
          fullWidth
          variant="outlined"
        />
        <TextField
          id="username"
          label="Username"
          margin="normal"
          defaultValue={username}
          fullWidth
          variant="outlined"
        />
          <TextField
          id="notes"
          label="Notes"
          margin="normal"
          multiline
          defaultValue={notes}
          fullWidth
          variant="outlined"
        />
          <TextField
          id="psw"
          label="Password"
          margin="normal"
          multiline
          value={plainPassword}
          fullWidth
          variant="outlined"
        />
        <ButtonDialogShow />
        <ButtonDialogUpdate />
        </form>
      </div>
      </Grid>
    </Grid>
  );
}
