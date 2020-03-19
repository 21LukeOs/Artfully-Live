import React from 'react';
import './Upload.scss';
import PageTitle from '../PageTitle/PageTitle';
import FileUploader from '../FileUploader/FileUploader';

const Upload = () => {
  return (
    <div className='upload'>
      <PageTitle text='Upload' />
      <FileUploader />
    </div>
  )
};

export default Upload;
