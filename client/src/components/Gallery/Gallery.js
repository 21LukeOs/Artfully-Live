import React from 'react';
import { Link } from 'react-router-dom';
import './Gallery.scss';
import PageTitle from '../utility/PageTitle';
import Buttons from '../utility/Buttons';

const Upload = () => {
  return (
    <div className='gallery'>
      <PageTitle text='Gallery' />
      <Link to='/profile' className='gallery__profile'>
        <Buttons text="Profile" />
      </Link>
    </div>
  )
};

export default Upload;
