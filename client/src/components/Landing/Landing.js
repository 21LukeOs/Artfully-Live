import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.scss';
import Buttons from '../utility/Buttons';

const Landing = () => {
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

export default Landing;
