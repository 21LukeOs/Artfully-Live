import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { vote } from '../../actions/gallery';

import './GalleryItem.scss';

const GalleryItem = ({ vote, photo: { _id, title, photo, votes } }) => {
	return (
		<div className='gallery-item'>
			<div className='gallery-item__img-cont'>
				<img src={photo} alt={title} className='gallery-item__gallery-img' />
				<button
					onClick={e => vote(_id)}
					type='button'
					className='gallery-item__vote-cnt'>
					{votes.length}
				</button>
			</div>
			<h3 className='gallery-item__img-title'>{title}</h3>
		</div>
	);
};

GalleryItem.propTypes = {
	photo: PropTypes.object.isRequired,
	vote: PropTypes.func.isRequired
};

export default connect(null, { vote })(GalleryItem);
