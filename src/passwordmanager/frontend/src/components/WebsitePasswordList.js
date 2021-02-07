import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from "@material-ui/core/Box"
import Paper from "@material-ui/core/Paper"
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button"
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
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
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
        <Grid item xs>
        <Paper className={paper}>
        <Link to={{
            pathname:`/${object.user}/${object.website_name}`,
            state: {
                website_name: object.website_name,
                website_url: object.website_url,
                username: object.username,
                password: object.password,
                notes: object.notes
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

    return (
    <div className={classes.root}>
      <Grid container spacing={3}>

        { websitePasswords.map((object, index) => 
            <ObjectRow object={object} paper={classes.paper} />
        )}
        
      </Grid>
    </div>
    );
}
