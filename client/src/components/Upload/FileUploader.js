import React, { useState } from 'react';
import './FileUploader.scss';
import axios from 'axios';

const FileUploader = () => {
	const [file, setFile] = useState('');
	const [fileTitle, setFileTitle] = useState('');

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

		try {
			const res = await axios.post('/api/photos', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});

			console.log(res);
		} catch (err) {
			console.error(err);
		}
		setFileTitle('');
	};

	return (
		<div className='post'>
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

export default FileUploader;
