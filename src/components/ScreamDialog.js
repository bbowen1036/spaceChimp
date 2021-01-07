import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../util/MyButton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

// MUI Stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
// Redux
import { connect } from 'react-redux';
import { getScream } from '../redux/actions/dataActions';

const styles = theme => ({
  invisibleSeparator: {
    border: 'none',
    margin: '4'
  },
  closeButton: {
    position: 'absolute',
    left: '90%'
  },
  ...theme.spread
})

class ScreamDialog extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
    this.props.getScream(this.props.screamId);
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { 
      classes, 
      scream:  { 
        screamId, 
        body, 
        createdAt, 
        likeCount, 
        commentCount, 
        userImage, 
        userHandle 
      }, 
      UI: { loading }
    } = this.props;

    const dialogMarkup = loading ? (
      <CircularProgress size={200} />
    ) : (
      <Grid container spacing={2}>
        <Grid item sm={5}>
          <img src={userImage} 
            alt='profile'  
            style={{ width: '200px',
              height: '200px',
              objectFit: 'cover',
              maxWidth: '100%',
              borderRadius: '50%' 
            }}
          />
        </Grid>
        <Grid item sm={7}>
          <Typography 
            component={Link}
            color='primary'
            variant='h5'
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator}/>
          <Typography variant='body2' color='textSecondary'>
            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
          </Typography>
          <hr className={classes.invisibleSeparator}/>
          <Typography variant='body1'>
            {body}
          </Typography>
        </Grid>
      </Grid>
    )

    return (
      <Fragment>
        <MyButton 
          onClick={this.handleOpen} 
          tip='Expand post' 
          tipClassName={classes.expandButton}
        >
          <UnfoldMore color='primary'/>
        </MyButton>
        <Dialog 
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='sm'
        >
          <MyButton 
            tip='Close' 
            onClick={this.handleClose} 
            tipClassName={classes.closeButton}
          >
            <CloseIcon/>
          </MyButton>
          <DialogContent className={classes.dialogContent}>
            { dialogMarkup }
          </DialogContent>
        </Dialog>
      </Fragment>
    )
  }
}

ScreamDialog.propTypes = {
  getScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mSTP = state => ({
  scream: state.data.scream,
  UI: state.UI
});

const mDTP = {
  getScream
};

export default connect(mSTP, mDTP)(withStyles(styles)(ScreamDialog));