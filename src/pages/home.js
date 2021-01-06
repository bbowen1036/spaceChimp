import React, { Component } from 'react';
import axios from 'axios'; 
import Grid from '@material-ui/core/Grid';

import Scream from '../components/Scream';
import Profile from '../components/Profile';

class Home extends Component {
  state = {
    screams: null
  }

  componentDidMount() {
    axios
      .get('/screams')
      .then((res) => {
        this.setState({
          screams: res.data
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    let recentScreamsMarkup = this.state.screams ? (
      this.state.screams.map(scream => <Scream key={scream.screamId} scream={scream}/>)
      // this.state.screams.map(scream => <p>{scream.body}</p>)
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

export default Home;