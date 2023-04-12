import React, { Component, Fragment } from "react";
import { GlobalStyle } from './reset.js'
import { GlobalIconStyle } from './icon/icon'
import Header from './common/header'
import store from './store';
import { Provider } from 'react-redux'
class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Fragment>
          <GlobalStyle />
          <GlobalIconStyle />
          <div>
            <Header></Header>
          </div>
        </Fragment>
      </Provider>
    )
  }
}
export default App