/*
 * @Author: your name
 * @Date: 2020-07-13 11:25:41
 * @LastEditTime: 2020-07-13 13:07:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-app\src\store\header\action.js
 */

const SEARCH_FOCUS = "SEARCH_FOCUS";
const SEARCH_BLUR = "SEARCH_BLUR";
const searchFocus = () => {
  return {
    type: SEARCH_FOCUS,
  };
};
const searchBlur = () => {
    return {
      type: SEARCH_BLUR,
    };
  };
  
export { SEARCH_FOCUS, SEARCH_BLUR, searchFocus,searchBlur };
