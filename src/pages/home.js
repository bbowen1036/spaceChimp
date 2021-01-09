import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
// Components
import Scream from '../components/scream/Scream';
import Profile from '../components/profile/Profile';
import ScreamSkeleton from '../util/ScreamSkeleton';  // Loading Post skeleton 
import LoginSplash from '../components/layout/LoginSplash';
// Redux
import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';

class Home extends Component {

  componentDidMount() {
    this.props.getScreams();
  }

  render() {
    const { screams, loading } = this.props.data;

    const authenticated = this.props.authenticated;


    let recentScreamsMarkup = !loading ? (authenticated ? (

      screams.map(scream => <Scream key={scream.screamId} scream={scream}/>)
    ) : (
      <LoginSplash/>
    )
    ) : (
      <ScreamSkeleton />
    );


    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    )
  }
}

Home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired
}

const mSTP = state => ({
  data: state.data,
  authenticated: state.user.authenticated,
})

export default connect(mSTP, { getScreams })(Home);
