import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// MUI Stuff
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// Redux 
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';

const styles = theme => ({
  ...theme.spread,
  buttonSubmit: {
    marginTop: 5
  }
});

class CommentForm extends Component {
  state = {
    body: '',
    errors: {}
  };


  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.body === '') {
      this.setState({ errors: {comment: 'Cannot be blank'} })
    } else {
      this.props.submitComment(this.props.screamId, { body: this.state.body });
      this.setState({ errors: {}, body: '' })
    }
  };

  render() {
    const { classes, authenticated } = this.props;
    const errors = this.state.errors;

    const commentFormMarkup = authenticated ? (
      <Grid item sm={12} style={{textAlign: 'center'}}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name='body'
            type='text'
            label='Comment on post'
            error={errors.comment ? true : false}
            helperText={errors.comment}
            value={this.state.body}
            onChange={this.handleChange}
            fullWidth
            className={classes.textField}
          />
          <Button 
            type='submit'
            variant='contained'
            color='primary'
            className={classes.buttonSubmit}
          >Submit
          </Button>
          <hr className={classes.visibleSeparator}/>
        </form>
      </Grid>
    ) : null 

    return commentFormMarkup
  }
}

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired
}

const mSTP = state => ({
  UI: state.UI,             // gives us errors
  authenticated: state.user.authenticated
})

export default connect(mSTP, {submitComment})(withStyles(styles)(CommentForm));