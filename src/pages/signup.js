import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';  // a built in React method for typechecking to minimize errors
import AppIcon from '../images/ape.png';
import { Link } from 'react-router-dom';

// MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'; 
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress'; // Progress Spinner
// Redux Stuff
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

const styles = {
  form: {
    textAlign: 'center',
  },
  image: {
    margin: '20px auto',
    maxHeight: '70px'
  },
  pageTitle: {
    margin: '10px auto'
  },
  textField: {
    margin: '10px auto'
  },
  button: {
    marginTop: 20,
    position: 'relative'
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10
  },
  progress: {
    position: 'absolute'
  }
}


class Signup extends Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      handle: '',
      errors: {}
    }
  } 

  componentDidUpdate(prevProps) {
    if (prevProps.UI.errors !== this.props.UI.errors) {
      this.setState({ errors: this.props.UI.errors });
    }
  }
  
  // Make an arrow function to avoid binding
  handleSubmit = (event) => {
    event.preventDefault();   // prevents form info from being shown in browser bar

    this.setState({
      loading: true
    });

    const newUserData = {                          // Submitted user data (from state)
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    };
    this.props.signupUser(newUserData, this.props.history)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  
  render() {
    const { classes, UI: { loading } } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt='appIcon' className={classes.image} /> 
          <Typography variant='h2' className={classes.pageTitle}>
            Signup
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField 
              id='email'
              name='email' 
              type="email" 
              label='Email' 
              className={classes.testField}
              helperText={errors.email}                // helperText prop to display errors or another instructional info
              error={errors.email ? true : false}     // The error prop toggles the error state
              value={this.state.email} 
              onChange={this.handleChange} 
              fullWidth
            />
            <TextField 
              id='password' 
              name='password' 
              type="password" 
              label='Password' 
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.password} 
              onChange={this.handleChange} 
              fullWidth
            />
            <TextField 
              id='confirmPassword' 
              name='confirmPassword' 
              type="password" 
              label='Confirm Password' 
              className={classes.textField}
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              value={this.state.confirmPassword} 
              onChange={this.handleChange} 
              fullWidth
            />
            <TextField 
              id='handle' 
              name='handle' 
              type="text" 
              label='Handle' 
              className={classes.textField}
              helperText={errors.handle}
              error={errors.handle ? true : false}
              value={this.state.handle} 
              onChange={this.handleChange} 
              fullWidth
            />
            {errors.general && (
              <Typography variant='body2' className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button 
              type='submit' 
              variant='contained' 
              color='primary' 
              className={classes.button}
              disabled={loading}                  // disables button when loading
            >
              Signup
              {loading && (
                <CircularProgress size={30} className={classes.progress} />                // Spinner conditional on if loading is true
              )}
            </Button>
            <br/>
            <small>Already have an account? Login <Link to='/login'>here</Link></small>
          </form>
        </Grid> 
        <Grid item sm />

      </Grid>
    )
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired
} 

const mSTP = (state) => ({
  user: state.user,
  UI: state.UI
})

export default connect(mSTP, { signupUser })(withStyles(styles)(Signup));
