import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
// Redux 
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../../redux/actions/dataActions';


class LikeButton extends Component {
  likedScream = () => {                         // If user has liked this post
    if(                       
      this.props.user.likes && 
      this.props.user.likes.find(
        like => like.screamId === this.props.screamId
      )
    )   
    return true;
    else return false;
  };

  likeScream = () => {
    this.props.likeScream(this.props.screamId)
  };

  unlikeScream = () => {
    this.props.unlikeScream(this.props.screamId)
  };

  render() {
    const { authenticated } = this.props.user;

    const likeButton = !authenticated ? (
      <Link to='/login'>
        <MyButton tip='Like'>
          <FavoriteBorderIcon color='primary'/>
        </MyButton>
      </Link>
    ) : (
      this.likedScream() ? (         // if returns true then we have like this post and it is in our likes array
        <MyButton tip='Undo like' onClick={this.unlikeScream}>
          <FavoriteIcon color='primary'/>
        </MyButton>
      ) : (
        <MyButton tip='Like' onClick={this.likeScream}>
          <FavoriteBorderIcon color='primary'/>
        </MyButton>
      )
    );

    return likeButton 
  }
}

LikeButton.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired
};

const mSTP = state => ({
  user: state.user
});

const mDTP = {
  likeScream,
  unlikeScream
};

export default connect(mSTP, mDTP)(LikeButton);