import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function WebsitePasswordDetail(props) {
  const classes = useStyles();
  const { website_name } = props.match.params;
  const { website_url } = props.location.state;
  const { username } = props.location.state;
  const { password } = props.location.state;
  const { notes } = props.location.state;


  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Website name: {website_name}
        </Typography>
        <Typography variant="h5" component="h2">
          Website url: {website_url}
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Username: {username}
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Notes: {notes}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Show password</Button>
      </CardActions>
    </Card>
  );
}