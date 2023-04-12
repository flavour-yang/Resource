/*
 * @Author: your name
 * @Date: 2020-07-12 23:33:01
 * @LastEditTime: 2020-07-13 00:13:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-app\src\store\index.js
 */
import { createStore, compose } from 'redux'
import reducer from './reducer'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers())
export default store