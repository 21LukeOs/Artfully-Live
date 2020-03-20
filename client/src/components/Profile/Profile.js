import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../utility/PageTitle';
import Buttons from '../utility/Buttons';
// import PropTypes from 'prop-types';

import './Profile.scss';

const Profile = props => {
  // const galleryPics = (
  //   <div>
  //     <h1>Uploads Currently in Gallery</h1>
  //     { user.pics.gallery.map(pic => {
  //       return <img src={pic} alt="pic.title" className='profile__img' />
  //     }) }
  //   </div>
  // )

  // const votedFor = (
  //   <div>
  //     <h1>Voted For</h1>
  //     <img src={photo.id} alt={photo.id.title} className='profile__img' />
  //   </div>
  // )

  return (
    <div className='profile'>
      <div className='profile__header'>
        {/* `${props.user.name}'s` */}
        <PageTitle text='Profile' />
        {/* `${ topThree ? topThree.length } Winners` */}
        <p className='profile__header-wins'>0 Winners</p>
      </div>
      {/* { user.pics.gallery && galleryPics } */}
      {/* { user.vote ? votedFor : '1 Vote' } */}
      <p className='profile__votes'>1 Vote</p>
      <Link to ='/gallery' className='profile__gallery'>
        <Buttons text="Gallery" />
      </Link>
      <Link to='/upload' className='profile__upload'>
        <Buttons text="Upload" />
      </Link>
    </div>
  )
}

Profile.propTypes = {

}

export default Profile;
