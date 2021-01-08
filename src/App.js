import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
// import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';  // MUI Theme
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

// Redux 
import { Provider } from "react-redux";
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions'
 
// Pages 
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import User from './pages/user';

// Components
import Navbar from './components/layout/Navbar';
import AuthRoute from './util/AuthRoute';

const theme = createMuiTheme(themeFile);


const token = localStorage.FBIdToken;
if(token) {
  const decodedToken = jwtDecode(token);     // decodedToken has property {exp} 
  // console.log(decodedToken)
  if (decodedToken * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme} >
    <Provider store={store} >
      
      <Router>
        <Navbar /> 
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Home} />
            <AuthRoute path='/login' component={Login} />
            <AuthRoute path='/signup' component={Signup} />
            <Route exact path='/users/:handle' component={User} />
            <Route exact path="/users/:handle/scream/:screamId" component={User} />
          </Switch>
        </div>
      </Router>
     
    </Provider> 
    </MuiThemeProvider>
  );
}

export default App;
