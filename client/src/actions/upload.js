import axios from 'axios';
import { setAlert } from './alert';
import {
  UPLOAD,
  UPLOAD_ERROR
} from './types';

//Add post
export const upload = formData => async dispatch =>  {
  const config = {
    header: {
      'Content-Type': 'multipart/form-data'
    }
  }

  try {
    const res = await axios.post(`/api/photos`, formData, config);

    dispatch({
      type: UPLOAD,
      payload: res.data
    });

    dispatch(setAlert('Uploaded!', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: UPLOAD_ERROR
    });
  }
};