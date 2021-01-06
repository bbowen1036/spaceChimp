import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
// Components
import Scream from '../components/Scream';
import Profile from '../components/Profile';
// Redux
import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';

class Home extends Component {

  componentDidMount() {
    this.props.getScreams();
  }

  render() {
    const { screams, loading } = this.props.data;

    // let recentScreamsMarkup = !loading ? (
    //   screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)

    let recentScreamsMarkup = !loading ? (
      screams.map(scream => <Scream key={scream.screamId} scream={scream}/>)
    ) : (
      <p>loading...</p>
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
  data: PropTypes.object.isRequired
}

const mSTP = state => ({
  data: state.data
})

export default connect(mSTP, { getScreams })(Home);
