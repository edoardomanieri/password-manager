import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog( {handleLogout }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseAccept = () => {
    setOpen(false);
    handleLogout();
  };

  const handleCloseReject = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
        Logout
      </Button>
      <Dialog
        open={open}
        onClose={handleCloseReject}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Logout from BetterPass"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              Are you sure you want to logout?
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