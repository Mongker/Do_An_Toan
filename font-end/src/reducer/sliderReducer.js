import { TYPE_ACTION } from '../actions/TypeAction';
const sliderReducer = (slider = {}, action) => {
	switch (action.type) {
		case TYPE_ACTION.SLIDER.GET_LIST:
			return { ...slider, ...action.payload.data };
		case TYPE_ACTION.SLIDER.POST_SLIDER:
			return { ...slider, ...action.payload.data };
		case TYPE_ACTION.SLIDER.PUT_SLIDER:
			return action.payload.data;
		case TYPE_ACTION.SLIDER.DELETE_SLIDER:
			return action.payload.data;
		default:
			return slider;
	}
};
export default sliderReducer;
