import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../utility/Spinner';
import PageTitle from '../utility/PageTitle';
import Buttons from '../utility/Buttons';
import { getCurrentProfile } from '../../actions/profile';
import PropTypes from 'prop-types';

import './Profile.scss';

const Profile = ({
	getCurrentProfile,
	auth: { user },
	profile: { profile, loading }
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	return loading && profile === null ? (
		<Spinner />
	) : (
		<div className='profile'>
			<div className='profile__header'>
				{user && user.name}'s
				<PageTitle text='Profile' />
			</div>
			<div className='profile__images'>
				{profile !== null && profile.photos[0] ? (
					<div className='profile__gallery-pic'>
						<h3 className='profile__img-head'>Your Upload</h3>
						<div className='profile__img-cont'>
							<img
								src={profile.photos[0].photo}
								alt={profile.photos[0].title}
								className='profile__gallery-img'
							/>
							<span className='profile__vote-cnt'>
								{profile.photos[0].votes.length}
							</span>
						</div>
						<h3 className='profile__img-title'>{profile.photos[0].title}</h3>
					</div>
				) : (
					<div className='profile__submit'>
						<h3>Navigate to 'Gallery' to upload your work</h3>
					</div>
				)}
				{profile !== null && profile.vote.vote ? (
					<div className='profile__voted-on'>
						<h3>Your Vote Goes to...</h3>
						<img src={profile.vote.vote} alt='you have voted' />
					</div>
				) : (
					<div className='profile__vote-on'>
						<h3>Cast your vote</h3>
					</div>
				)}
			</div>
			<Link to='/gallery' className='profile__gallery'>
				<Buttons text='Gallery' />
			</Link>
		</div>
	);
};

Profile.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
