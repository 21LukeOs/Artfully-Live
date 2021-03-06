import axios from "axios";

import {
  GET_PROFILE,
  PROFILE_ERROR
} from "./types";

//Get the current users profile
export const getCurrentProfile = () => async dispatch => {
	try {
		const res = await axios.get("/api/profile");

		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.statusText, status: err.status }
		});
	}
};