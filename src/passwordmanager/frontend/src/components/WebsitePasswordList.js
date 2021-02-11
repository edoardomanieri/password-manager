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
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


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
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));


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

    function WebsitePasswordCard ( {object} ){
        return (
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image="../../static/images/pass.jpg"
            title="Image title"
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
            {object.website_name}
            </Typography>
            <Typography>
              URL: {object.website_url}
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
              }}>
            <Button size="small" color="primary">
              View
            </Button>
            </Link>
          </CardActions>
        </Card>
      </Grid>
        );
        }

    return (
    <div className={classes.root}>
      <input class="input-field" type="text" placeholder="Search" />
      <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {websitePasswords.map((object) => (
              <WebsitePasswordCard object={object} />
            ))}
          </Grid>
        </Container>
      <IconButton style={{ fontSize: 80, position:"fixed", bottom:30, right:5 }} onClick={handleClick}>
      <Icon style={{ fontSize: 80 }} color="primary">add_circle</Icon>
      </IconButton>
    </div>
    );
}
