import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../utility/Spinner';
import GalleryItem from './GalleryItem';
import Upload from '../Upload/Upload';
import { getPhotos } from '../../actions/gallery';
import { getTopThree } from '../../helpers/helpers';

import PageTitle from '../utility/PageTitle';
import Buttons from '../utility/Buttons';

import './Gallery.scss';

const Gallery = ({ getPhotos, gallery: { photos, loading } }) => {
	useEffect(() => {
		getPhotos();
	}, [getPhotos]);

	return loading ? (
		<Spinner />
	) : (
		<div className='gallery'>
			<PageTitle text='Gallery' />
			{photos[0] ? (
				<div className='gallery__items'>
					{photos.map((photo) => (
						<GalleryItem key={photo._id} photo={photo} />
					))}
				</div>
			) : (
				<div>
					<h3 className='gallery__be-first'>Be the first to upload!</h3>
				</div>
			)}
			<PageTitle text='Top Three' />
			<div className='gallery__top-three'>
				{getTopThree(photos).map((photo) => (
					<GalleryItem key={photo._id + 2} photo={photo} />
				))}
			</div>
			<Upload />
			<Link to='/profile' className='gallery__profile'>
				<Buttons text='Profile' />
			</Link>
		</div>
	);
};

Gallery.propTypes = {
	getPhotos: PropTypes.func.isRequired,
	gallery: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	gallery: state.gallery,
});

export default connect(mapStateToProps, { getPhotos })(Gallery);
