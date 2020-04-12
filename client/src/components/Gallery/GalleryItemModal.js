import React from 'react';
import './GalleryItemModal.scss';

const GalleryItemModal = ({ img, closeModal }) => {
	return (
		<div className='modal' onClick={closeModal}>
      <div className='modal__img-wrapper'>
        <img src={img} alt='enlarged' />
      </div>
		</div>
	);
};

export default GalleryItemModal;
