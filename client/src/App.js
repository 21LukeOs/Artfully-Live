import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Upload from './components/Upload/Upload';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Alert from './components/Alert/Alert';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.scss';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

	return (
		<Provider store={store}>
      <Router>
        <div className='app'>
          <Alert />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path ='/upload' component={Upload} />
          </Switch>
        </div>
      </Router>
		</Provider>
	);
}

export default App;
