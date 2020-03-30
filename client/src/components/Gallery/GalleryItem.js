import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './GalleryItem.scss';

const GalleryItem = ({
	photo: { _id, title, photo, user, votes, date }
}) => {
	return (
		<div className='gallery-item'>
			<div className='gallery-item__img-cont'>
				<img src={photo} alt={title} className='gallery-item__gallery-img' />
				<span className='gallery-item__vote-cnt'>{votes.length}</span>
			</div>
			<h3 className='gallery-item__img-title'>{title}</h3>
		</div>
	);
};

GalleryItem.propTypes = {
	photo: PropTypes.object.isRequired,
	// auth: PropTypes.object.isRequired
};

// const mapStateToProps = state => ({
// 	photo: state.auth
// });

export default connect()(GalleryItem);
