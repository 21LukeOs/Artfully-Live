import {
  GET_PHOTOS,
  PHOTOS_ERROR,
  UPLOAD,
  UPLOAD_ERROR,
  VOTE,
  VOTE_ERROR
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
    case UPLOAD_ERROR:
    case VOTE_ERROR:
			return {
				...state,
				error: payload,
				loading: false
      };
    case UPLOAD:
      return {
        ...state,
        photos: [payload, ...state.photos],
        loading: false
      };
    case VOTE:
			return {
				...state,
				photos: state.photos.map(photo =>
					photo._id === payload.id ? { ...photo, votes: payload.vote } : photo
				),
				loading: false
      };
    default:
			return state;
	}
};