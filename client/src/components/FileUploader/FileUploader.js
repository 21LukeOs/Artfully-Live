import React, { useState } from 'react';
import './FileUploader.scss';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [fileTitle, setFileTitle] = useState('');

  const fileChange = e => {
    setFile(e.target.files[0]);
  };

  const titleChange = e => {
    setFileTitle(e.target.value);
  }

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', fileTitle)

    try {
      await axios.post('/photos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });


    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="post">
      <div className="post__post-pic">
        <form className="post__upload-form" id="picForm" onSubmit={onSubmit} >
          <label htmlFor="title" className="post__upload-title-label post__upload-label" >Title</label>
            <input type="text" id="title" name="title" className="post__upload-title post__upload-input" onChange={titleChange} />
          <label htmlFor="file" className="post__upload-file-label post__upload-label" >Image To Upload</label>
          <input type="file" id="file" className="post__upload-file" onChange={fileChange} />
          <button type="submit" className="post__upload-submit" form="picForm" >Submit</button>
        </form>
      </div>
    </div>
    
    // <form onSubmit={onSubmit}>
    //   <div className='custom-file mb-4'>
    //     <input
    //       type='file'
    //       className='custom-file-input'
    //       id='customFile'
    //       onChange={onChange}
    //     />
    //     <label className='custom-file-label' htmlFor='customFile'>
    //       {filename}
    //     </label>
    //   </div>

    //   <input
    //     type='submit'
    //     value='Upload'
    //     className='btn btn-primary btn-block mt-4'
    //   />
    // </form>

  );
};

export default FileUpload;