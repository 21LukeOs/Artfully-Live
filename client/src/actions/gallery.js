import axios from "axios";
import { setAlert } from './alert';

import {
  GET_PHOTOS,
  PHOTOS_ERROR,
  UPLOAD,
  UPLOAD_ERROR,
  VOTE,
  VOTE_ERROR
} from "./types";

//Get photos
export const getPhotos = () => async dispatch =>  {
  try {
    const res = await axios.get('/api/photos');

    dispatch({
      type: GET_PHOTOS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PHOTOS_ERROR,
      payload: { msg: err.statusText, status: err.status }
    });
  }
};

//Add post
export const upload = formData => async dispatch =>  {
  const config = {
    header: {
      'Content-Type': 'multipart/form-data'
    }
  }

  try {
    const res = await axios.post(`/api/photos/up`, formData, config);

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

//Add vote
export const vote = id => async dispatch =>  {
  try {
    const res = await axios.put(`/api/photos/vote/${id}`);

    dispatch({
      type: VOTE,
      payload: { id, vote: res.data }
    });
  } catch (err) {
    dispatch({
      type: VOTE_ERROR,
      payload: { msg: err.statusText, status: err.status }
    });
  }
};