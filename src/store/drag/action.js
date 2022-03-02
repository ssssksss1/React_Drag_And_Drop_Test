import { DRAG_GRAB } from './type';
import { OTHER_DRAG_CHECK } from './type';
export const dragGrab = (payload) => {
  return {
    type: DRAG_GRAB,
    payload: payload
  }
};
export const otherDragCheck = (payload) => {
  return {
    type: OTHER_DRAG_CHECK,
    payload: payload
  }
};