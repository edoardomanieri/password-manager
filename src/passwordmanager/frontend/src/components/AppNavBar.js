import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, NavLink } from "react-router-dom"
import { useHistory } from "react-router-dom";
import AlertDialog from "./AlertDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function AppNavBar({isLoggedIn, setLogin }) {
  const classes = useStyles();
  const history = useHistory();

  function handleLogout() {
    localStorage.removeItem('token');
    setLogin();
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            BetterPass
          </Typography>
          <Link to="/" style={{ textDecoration: 'none'}} exact>
              <Button style={{ color: '#FFFFFF'}}>
              Home
              </Button>
        </Link>
        {isLoggedIn ? null :
        <Link to="/login" style={{ textDecoration: 'none'}} exact>
            <Button style={{ color: '#FFFFFF'}}>
            Login
            </Button>
        </Link>
        }
        {isLoggedIn ? null :
        <Link to="/signup" style={{ textDecoration: 'none'}} exact>
            <Button style={{ color: '#FFFFFF'}}>
            Signup
            </Button>
        </Link>
        }
        {!isLoggedIn ? null :
        <Link to="/list" exact style={{ textDecoration: 'none'}}>
            <Button style={{ color: '#FFFFFF'}}>
            Passwords
            </Button>
        </Link>
        }
        {!isLoggedIn ? null :
        <AlertDialog handleLogout={handleLogout} />
        }
        </Toolbar>
      </AppBar>
    </div>
  );
}