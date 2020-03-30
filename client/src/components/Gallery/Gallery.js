import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../utility/Spinner';
import GalleryItem from './GalleryItem';
import Upload from '../Upload/Upload';
import { getPhotos } from '../../actions/gallery';

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
			<div className='gallery__items'>
				{photos.map(photo => (
					<GalleryItem key={photo._id} photo={photo} />
				))}
			</div>
      <Upload />
      <Link to='/profile' className='gallery__profile'>
        <Buttons text="Profile" />
      </Link>
    </div>
  )
};

Gallery.propTypes = {
	getPhotos: PropTypes.func.isRequired,
	gallery: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	gallery: state.gallery
});

export default connect(mapStateToProps, { getPhotos })(Gallery);



// const Posts = ({ getPosts, post: { posts, loading } }) => {
// 	useEffect(() => {
// 		getPosts();
// 	}, [getPosts]);

// 	return loading ? (
// 		<Spinner />
// 	) : (
// 		<Fragment>
// 			<h1 className='large text-primary'>Posts</h1>
// 			<p className='lead'>
// 				<i className='fas fa-user'></i> Welcome to the community
// 			</p>
// 			<PostForm />
// 			<div className='posts'>
// 				{posts.map(post => (
// 					<PostItem key={post._id} post={post} />
// 				))}
// 			</div>
// 		</Fragment>
// 	);
// };

// Posts.propTypes = {
// 	getPosts: PropTypes.func.isRequired,
// 	post: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
// 	post: state.post
// });

// export default connect(mapStateToProps, { getPosts })(Posts);

