import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../util/MyButton';
// import { editUserDetails } from '../redux/actions/userActions';
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
// Icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
// Redux
import { connect } from 'react-redux';
import { postScream } from '../redux/actions/dataActions'; 

const styles = theme => ({
  ...theme.spread,
  submitButon: {
    position: 'relative',
    marginTop: '10',
    float: 'right',
    color: 'red'
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
    top: '6%'
  }
});


class PostScream extends Component {
  state = {
    open: false,
    body: '',
    errors: {}
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  };

  handleOpen = () => {
    this.setState({ open: true })
  };

  handleClose = () => {
    this.setState({ open: false, errors: {}, body: '' })
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.body.length === 0) {
      this.setState({
        errors: { body: 'Message cannot be empty'}
      })
    } else {
      this.props.postScream({ body: this.state.body });
      this.handleClose();
    }
  };

  render() {
    const { errors } = this.state;
    const { classes, UI: { loading }} = this.props;   
    
    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip="Drop a post!"
        >
          <AddIcon color='primary'/>
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='sm'
        >
          <MyButton tip='Close' onClick={this.handleClose} tipClassName={classes.closeButton}>
            <CloseIcon/>
          </MyButton>
          <DialogTitle>Write a new post</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name='body'
                type='text'
                label='Post!'
                multiline
                rows='3'
                placeholder='Drop a post'
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button 
                type='submit'
                variant='contained' 
                color='primary'
                className={classes.submitButton}
                disabled={loading}
              >Submit
                {loading && (
                  <CircularProgress size={30} className={classes.progressSpinner} />
                )}
              </Button>
            </form> 
          </DialogContent>
        </Dialog>
      </Fragment>
    )
  }
};


PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mSTP = state => ({
  UI: state.UI,
});

export default connect(mSTP, { postScream })(withStyles(styles)(PostScream));