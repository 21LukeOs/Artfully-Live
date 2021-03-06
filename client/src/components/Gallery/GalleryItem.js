import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GalleryItemModal from './GalleryItemModal';
import { connect } from 'react-redux';
import { vote } from '../../actions/gallery';

import './GalleryItem.scss';

const GalleryItem = ({
	vote,
	photo: { _id, title, photo, uploader, votes },
}) => {

  const [modal, openClose] = useState(false);

  const onClick = e => {
    openClose(!modal)
  }

	return (
    <>
    {modal && <GalleryItemModal img={photo} className='modal' closeModal={onClick} />}
		<div className='gallery-item'>
			<div className='gallery-item__img-cont'>
				<img src={photo} alt={title} className='gallery-item__gallery-img' onClick={onClick} />
				<button
					onClick={(e) => vote(_id)}
					type='button'
					className='gallery-item__vote-cnt'>
					{votes.length}
				</button>
			</div>
			<div className='gallery-item__img-info'>
				<h2 className='gallery-item__img-title'>{title}</h2>
				<h4 className='gallery-item__img-uploader'>By: {uploader}</h4>
			</div>
		</div>
    </>
	);
};

GalleryItem.propTypes = {
	photo: PropTypes.object.isRequired,
	vote: PropTypes.func.isRequired,
};

export default connect(null, { vote })(GalleryItem);
