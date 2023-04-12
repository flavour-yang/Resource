/*
 * @Author: your name
 * @Date: 2020-07-12 23:46:06
 * @LastEditTime: 2020-07-13 13:10:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-app\src\store\reducer.js
 */
import { SEARCH_FOCUS, SEARCH_BLUR } from "./action";
const defaultState = {
  focused: false,
};
export default (state = defaultState, action) => {
  if (action.type === SEARCH_FOCUS) {
    return {
      focused: true,
    };
  }
  if (action.type === SEARCH_BLUR) {
    return {
      focused: false,
    };
  }
  return state;
};
