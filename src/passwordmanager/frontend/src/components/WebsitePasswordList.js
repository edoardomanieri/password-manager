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


const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
        padding: theme.spacing(3),
        textAlign: 'center',
        height: 140,
        color: theme.palette.text.secondary,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


function ObjectRow( {object, paper} ) {
    return (
        <Grid item xs={6}>
        <Paper className={paper}>
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
        }}>
          <Button variant="contained" color="primary">
          {object.website_name}
        </Button>
        </Link>
        </Paper>
        </Grid>
    );
  }



export default function WebsitePasswordList() {

    const classes = useStyles();
    const history = useHistory();
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
        Axios.get('/websitepasswords/list',
        {
            headers: {Authorization: `JWT ${localStorage.getItem('token')}`}
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

    return (
    <div className={classes.root}>
      <input class="input-field" type="text" placeholder="Search Website" />
      <Grid container spacing={3}>
        { websitePasswords.map((object, index) => 
            <ObjectRow object={object} paper={classes.paper} />
        )}
      </Grid>
      <IconButton style={{ fontSize: 80, position:"absolute", bottom:30, right:5 }} onClick={handleClick}>
      <Icon style={{ fontSize: 80 }} color="primary">add_circle</Icon>
      </IconButton>
    </div>
    );
}
