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
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';
import Axios from 'axios';
import pass from "../../static/images/pass.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${pass})`,
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

export default function CreateWebsitePassword() {

  const [websiteURL, setWebsiteURL] = useState("");
  const [websiteName, setWebsiteName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notes, setNotes] = useState("");
  const [masterPassword, setMasterPassword] = useState("");
  const [errorTextMasterPassword, setErrorTextMasterPassword] = useState("");
  const [errorTextWebsiteURL, setErrorTextWebsiteURL] = useState("");
  
  const classes = useStyles();
  const csrfToken = Cookies.get('csrftoken');
  const history = useHistory();

const validate = () => {
  if (!websiteURL.includes(".")){
    setErrorTextWebsiteURL("Not a valid URL");
    return false;
  }
  setErrorTextMasterPassword("");
  setErrorTextWebsiteURL("");
  return true;
}

  function handleSubmit(e){
      e.preventDefault();
      if (!validate())
        return;
      let websiteUrlFormatted = websiteURL;
      if(!websiteUrlFormatted.startsWith("http")){
          websiteUrlFormatted = "https://".concat(websiteUrlFormatted);
          setWebsiteURL(websiteUrlFormatted);
        }
      Axios.post("/websitepasswords/",
      {
        'website_url': websiteUrlFormatted,
        'website_name': websiteName,
        'username': username,
        'password': password,
        'notes': notes,
        'master_password': masterPassword
      },
      {
        headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,
            }
    }
    )
    .then(response => {
      history.push("/list");
    })
    .catch(error => setErrorTextMasterPassword("Wrong Master Password"));
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
          Save New Password
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="websiteURL"
                variant="outlined"
                error={errorTextWebsiteURL.length != 0}
                helperText={errorTextWebsiteURL}
                required
                fullWidth
                id="websiteURL"
                label="Website URL"
                value={websiteURL}
                autoFocus
                onChange={(e) => setWebsiteURL(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="websiteName"
                label="Website Name"
                name="websiteName"
                value={websiteName}
                onChange={(e) => setWebsiteName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                multiline
                label="Notes"
                id="notes"
                name="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                error={errorTextMasterPassword.length != 0}
                helperText={errorTextMasterPassword}
                required
                fullWidth
                name="masterPassword"
                label="Master Password"
                type="password"
                id="masterPassword"
                value={masterPassword}
                onChange={(e) => setMasterPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Save Website Password
          </Button>
        </form>
        </div>
      </Grid>
    </Grid>
  );
}