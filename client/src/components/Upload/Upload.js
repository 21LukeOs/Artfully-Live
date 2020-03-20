import React from 'react';
import './Upload.scss';
import PageTitle from '../utility/PageTitle';
import FileUploader from './FileUploader';

const Upload = () => {
  return (
    <div className='upload'>
      <PageTitle text='Upload' />
      <FileUploader />
    </div>
  )
};

export default Upload;
