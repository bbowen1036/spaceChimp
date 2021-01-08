import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import NoImg from '../images/no-img.png';

// MUI
import Paper from '@material-ui/core/Paper';
// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import theme from './theme';

const styles = (theme) =>( {
  ...theme.spread,
  handle: {
    height: 20,
    backgroundColor: theme.palette.primary.main,
    width: 60,
    margin: '0 auto 7px auto'
  },
  fullLine: {
    height: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: '100%',
    marginBottom: 10
  },
  halfLine: {
    height: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: '50%',
    marginBottom: 10
  },
  profileImage: {
    width: 200,
    height: 200,
    objectFit: 'cover',
    maxWidth: '100%',
    borderRadius: '50%'
  },
  imageWrapper: {
    textAlign: 'center',
    position: 'relative',
  }
})

const ProfileSkeleton = (props) => {
  const {classes} = props;

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className={classes.imageWrapper}>
          <img src={NoImg} alt='oops' className={classes.profileImage}/>
        </div>
        <hr/>
        <div className='profile-details'>
          <div className={classes.handle}/>
          <hr/>
          <div className={classes.fullLine}/>
          <div className={classes.fullLine}/>
          <hr/>
          <LocationOn color='primary'/> <span>Location</span>
          <hr/>
          <LinkIcon color='primary'/> https://website.com
          <hr/>
          <CalendarToday color='primary'/> Joined date
        </div>
      </div>

    </Paper>
  )
}

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProfileSkeleton);