import {
  GET_PHOTOS,
  PHOTOS_ERROR
} from "../actions/types";

const initialState = {
	photos: [],
	loading: true,
	error: {}
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_PHOTOS:
			return {
				...state,
				photos: payload,
				loading: false
      };
    case PHOTOS_ERROR:
			return {
				...state,
				error: payload,
				loading: false
			};
    default:
			return state;
	}
};