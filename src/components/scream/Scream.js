import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';  // styles gives access to the variable 'classes' 
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';                     // to get relative time from posting
import relativeTime from 'dayjs/plugin/relativeTime';        // pluggin to be passed to dayjs
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import DeleteScream from './DeleteScream'; 
import ScreamDialog from './ScreamDialog';
import LikeButton from './LikeButton';
// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// Icons
import ChatIcon from '@material-ui/icons/Chat';

// Redux
import { connect } from 'react-redux';

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
};

class Scream extends Component {
  

  render() {
    dayjs.extend(relativeTime);

    const { 
      classes, 
      scream : { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount },
      user: { authenticated, credentials: { handle } } 
    } = this.props;


    // delete post button is rendered on posts ONLY if user is logged in and that post BELONGS to user
    const deleteButton = authenticated && userHandle === handle ? (
      <DeleteScream screamId={screamId}/>
    ) : null


    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title='Profile Image' 
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography 
            variant='h5' 
            component={Link}                  
            to={`/users/${userHandle}`} 
            color='primary'
          >                                {/* LINK TO USER SHOW PAGE */}
            {userHandle}
          </Typography> 
          {deleteButton}    
          <Typography variant='body2' color='textSecondary'>
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant='body1'>
            {body}
          </Typography>
          <LikeButton screamId={screamId}/> 
          <span>{likeCount} Likes</span>
          <MyButton tip='comments'>
            <ChatIcon color='primary'/>
          </MyButton>
          <span>{commentCount} comments</span>
          <ScreamDialog screamId={screamId} userHandle={userHandle} />
        </CardContent>
      </Card>  
    )
  }
}

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

const mSTP = state => ({
  user: state.user
})


export default connect(mSTP)(withStyles(styles)(Scream));
