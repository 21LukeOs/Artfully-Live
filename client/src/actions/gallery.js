import axios from "axios";

import {
  GET_PHOTOS,
  PHOTOS_ERROR
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