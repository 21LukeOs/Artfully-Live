import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Upload from './components/Upload/Upload';
import Register from './components/Register/Register';
import LogIn from './components/LogIn/LogIn';

//Redux
// import { Provider } from 'react-redux';
// import store from './store';

function App() {
	return (
		// <Provider store={store}>
      <Router>
        <div className='app'>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={LogIn} />
            <Route exact path ='/upload' component={Upload} />
          </Switch>
        </div>
      </Router>
		// </Provider>
	);
}

export default App;
