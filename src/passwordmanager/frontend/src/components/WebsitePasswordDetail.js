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
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Cookies from 'js-cookie';
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';

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


const ButtonDialogUpdate = ( {id, websiteURL, websiteName, username, notes, encryptedPassword, isPasswordChanged, plainPassword} ) => {

  const [openUpdate, setOpenUpdate] = useState(false);
  const [masterPassword, setMasterPassword] = useState("");
  const classes = useStyles();
  const history = useHistory();
  const csrfToken = Cookies.get('csrftoken');

  const handleClickOpenUpdate = () => {
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const getPlainPasswordPromise = () => {
    return axios.post("/websitepasswords/get-password/",
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
  );
}

async function handleUpdate()  {
  setOpenUpdate(false);
  let plainPasswordSync;
  // if password has not changed then we need the decrypted password to store data
  if(!isPasswordChanged){
    try {
      const response = await getPlainPasswordPromise(); 
      const { data } = await response;
      plainPasswordSync = data.plain_password;
    }
    catch(err) {
      alert("Wrong password");
      return;
    }
  }
  else {
    plainPasswordSync = plainPassword;
  }

  axios.put(`/websitepasswords/update-website-password/${id}`,
  {
    'website_url': websiteURL,
    'website_name': websiteName,
    'username': username,
    'password': plainPasswordSync,
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
.then(resp => history.push("/list"))
.catch(error => alert("Wrong password"));
}

  return (
    <div>
    <Button className={classes.submit} type="button" variant="contained" fullWidth color="primary" onClick={handleClickOpenUpdate}>
    update details
  </Button>
  <Dialog open={openUpdate} onClose={handleCloseUpdate} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">Update Details</DialogTitle>
    <DialogContent>
      <DialogContentText>
        To update the details for this website and show the password, please enter your master password here.
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

const ButtonDialogShow = ( {encryptedPassword, setPlainPassword, isPasswordChanged}) => {
  const [openShow, setOpenShow] = useState(false);
  const [masterPassword, setMasterPassword] = useState("");
  const [isPasswordPlain, setIsPasswordPlain] = useState(false);
  const csrfToken = Cookies.get('csrftoken');
  const classes = useStyles();


  const handleClickOpenShow = () => {
    if (!isPasswordPlain && !isPasswordChanged)
      setOpenShow(true);
  };

  const handleCloseShow = () => {
    setOpenShow(false);
  };


  const handleEnteredPassword = () => {
    setOpenShow(false);
    axios.post("/websitepasswords/get-password/",
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
  .catch(error => alert("wrong passwrod"));
}


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

export default function WebsitePasswordDetail(props) {

  const classes = useStyles();
  const [plainPassword, setPlainPassword] = useState("**********");
  const [isPasswordChanged, setisPasswordChanged] = useState(false);

  const { id } = props.location.state;
  const { website_name_current } = props.location.state;
  const { website_url_current } = props.location.state;
  const { username_current } = props.location.state;
  const { encryptedPassword } = props.location.state;
  const { notes_current } = props.location.state;

  const [websiteName, setWebsiteName] = useState(website_name_current);
  const [websiteURL, setWebsiteURL] = useState(website_url_current);
  const [username, setUsername] = useState(username_current);
  const [notes, setNotes] = useState(notes_current);


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
          Website Details
        </Typography>
        <form className={classes.form} noValidate>
        <TextField
          id="webname"
          label="Website Name"
          margin="normal"
          value={websiteName}
          fullWidth
          variant="outlined"
          onChange={(e) => setWebsiteName(e.target.value)}
        />
        <TextField
          id="weburl"
          label="Website URL"
          margin="normal"
          value={websiteURL}
          fullWidth
          variant="outlined"
          onChange={(e) => setWebsiteURL(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton onClick={()=> window.open(websiteURL, "_blank")}>
                  <SubdirectoryArrowRightIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <TextField
          id="username"
          label="Username"
          margin="normal"
          value={username}
          fullWidth
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
        />
          <TextField
          id="notes"
          label="Notes"
          margin="normal"
          multiline
          value={notes}
          fullWidth
          variant="outlined"
          onChange={(e) => setNotes(e.target.value)}
        />
          <TextField
          id="psw"
          label="Password"
          margin="normal"
          value={plainPassword}
          fullWidth
          variant="outlined"
          onChange={(e) => {
            setPlainPassword(e.target.value);
            setisPasswordChanged(true);
          }}
        />
        <ButtonDialogShow 
        encryptedPassword={encryptedPassword}
        setPlainPassword={setPlainPassword}
        isPasswordChanged={isPasswordChanged}
        />
        <ButtonDialogUpdate 
        id={id}
        websiteURL={websiteURL}
        websiteName={websiteName}
        username={username}
        notes={notes}
        encryptedPassword={encryptedPassword}
        isPasswordChanged={isPasswordChanged}
        plainPassword={plainPassword}
        />
        </form>
      </div>
      </Grid>
    </Grid>
  );
}
