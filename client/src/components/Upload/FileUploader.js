import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { upload } from '../../actions/gallery';
import Alert from '../utility/Alert';
import './FileUploader.scss';

const FileUploader = ({ upload }) => {
	const [file, setFile] = useState('');
	const [fileTitle, setFileTitle] = useState('');
	const [key, changeKey] = useState('');

	const fileChange = e => {
		setFile(e.target.files[0]);
	};

	const titleChange = e => {
		setFileTitle(e.target.value);
	};

	const onSubmit = async e => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('file', file);
		formData.append('title', fileTitle);
		upload(formData);
		setFileTitle('');
		changeKey(Date.now());
	};

	return (
		<div className='post'>
      <Alert />
			<div className='post__post-pic'>
				<form className='post__upload-form' id='picForm' onSubmit={onSubmit}>
					<label
						htmlFor='title'
						className='post__upload-title-label post__upload-label'>
						Title
					</label>
					<input
						type='text'
						id='title'
						name='title'
						className='post__upload-title post__upload-input'
						value={fileTitle}
						onChange={titleChange}
						// required
					/>
					<label
						htmlFor='file'
						className='post__upload-file-label post__upload-label'>
						Image To Upload
					</label>
					<input
						type='file'
						id='file'
						name='file'
						className='post__upload-file'
						key={key}
						onChange={fileChange}
					/>
					<button type='submit' className='post__upload-submit'>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

FileUploader.propTypes = {
	upload: PropTypes.func.isRequired
};

export default connect(null, { upload })(FileUploader);
