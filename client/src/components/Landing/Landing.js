import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Buttons from '../utility/Buttons';

import './Landing.scss';

const Landing = ({ isAuthenticated }) => {

  //Redirect if logged in
  if(isAuthenticated) {
    return <Redirect to='/profile' />
  }

  return (
    <div className='landing'>
      <Link to ='/register' className='landing__register'>
        <Buttons text="Register" />
      </Link>
      <Link to='/login' className='landing__log-in'>
        <Buttons text="Log In" />
      </Link>
    </div>
  )
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
