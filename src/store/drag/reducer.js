import { DRAG_GRAB, OTHER_DRAG_CHECK } from './type';
const initialState = {
  dragGrab: null,
  isOtherDragCheck: false
};
const dragReducer = (state = initialState, action) => {
  switch (action.type) {
    case DRAG_GRAB:
      return {
        ...state,
        dragGrab: action.payload
      }
    case OTHER_DRAG_CHECK:
      return {
        ...state,
        isOtherDragCheck: action.payload
      }
    default:
      return state;
  }
};
export default dragReducer;