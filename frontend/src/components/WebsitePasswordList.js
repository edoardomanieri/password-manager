import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper"
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from "react-router-dom";
import Axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Cookies from 'js-cookie';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import ImageButtonLock from "./ImageButtonLock";
import safeapp from "../../static/images/safeapp.jpg";
import padlock from "../../static/images/padlock2.png";
import poster from "../../static/images/poster.png";


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderWidth:'1px',
    borderStyle:'solid',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    borderBottom: '1px solid',
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));


function AlertDialog( {fetchData, id} ) {
  const [open, setOpen] = useState(false);
  const csrfToken = Cookies.get('csrftoken');

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleCloseAccept = () => {
    setOpen(false);
    Axios.delete(`/websitepasswords/${id}`,
    {
      headers: {
              Authorization: `JWT ${localStorage.getItem('token')}`,
              "Content-Type": "application/json",
              "X-CSRFToken": csrfToken
          },
          data: {

          }
  })
  .then(resp => fetchData())
  .catch(error => alert(error));
  };

  const handleCloseReject = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button size="small" color="primary" onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleCloseReject}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete website password"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this element?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReject} color="primary">
            No
          </Button>
          <Button onClick={handleCloseAccept} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default function WebsitePasswordList() {

    const classes = useStyles();
    const history = useHistory();
    const [inputValue, setInputValue] = useState("");
    const [websitePasswords, setWebsitePasswords] = useState([ {
        id: 1,
        user: "",
        notes: "",
        password: "",
        username: "",
        website_name: "",
        website_url: "",
    }
    ]);

    const fetchData = () => {
        Axios.get('/websitepasswords/',
        {
            headers: {
              Authorization: `JWT ${localStorage.getItem('token')}`
            }
        }
        )
        .then(resp => {
            setWebsitePasswords(e => [...resp.data]);
         })
    }

    //to avoid being called many times
    useEffect(() => {
        fetchData();
      }, []);

    const handleClick = () => {
        history.push("/create");
      }



    function WebsitePasswordCard ( {object} ){
        return (
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image={padlock}
            title="Image title"
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
            {object.website_name}
            </Typography>
            <Typography style={{fontWeight: "bold"}}>
              {object.website_url}
            </Typography>
          </CardContent>
          <CardActions>
          <Link to={{
                  pathname:`/${object.user}/${object.website_name}`,
                  state: {
                      id: object.id,
                      website_name_current: object.website_name,
                      website_url_current: object.website_url,
                      username_current: object.username,
                      encryptedPassword: object.password,
                      notes_current: object.notes
                  }
              }} style={{ textDecoration: 'none'}}>
            <Button size="small" color="primary">
              View
            </Button>
            </Link>
            <AlertDialog fetchData={fetchData} id={object.id}/>
          </CardActions>
        </Card>
      </Grid>
        );
        }

    const filteredWebsitePasswords = websitePasswords.filter(websitePassword => {
          return websitePassword.website_name.toLowerCase().includes(inputValue.toLowerCase())
        })
    
    return (
    <div className={classes.root}>
     <TextField 
     variant="outlined"
     placeholder="Search..."
     value={inputValue} 
     onChange={(e) => setInputValue(e.target.value)}
     style={{
      margin: "2rem",
      marginLeft: "15%",
      width: "70%",
      fontSize: "1.5rem",
      backgroundColor: '#FFFFFF'
     }}
     InputProps={{
      endAdornment: (
        <InputAdornment>
            <SearchIcon />
        </InputAdornment>
      )
    }}
     />
      <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {(websitePasswords.length == 0 || websitePasswords[0].user.valueOf() == "") ?
            <ImageButtonLock onClick={handleClick} />  :
            filteredWebsitePasswords.map((object) => (
              <WebsitePasswordCard object={object} />
            ))
          }
          </Grid>
        </Container>
      <IconButton style={{ fontSize: 80, position:"fixed", bottom:30, right:5 }} onClick={handleClick}>
      <Icon style={{ fontSize: 80 }} color="primary">add_circle</Icon>
      </IconButton>
    </div>
    );
}
