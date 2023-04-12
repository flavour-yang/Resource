import React from "react";
import {
  HeaderWrapper,
  Nav,
  Logo,
  NavItem,
  NavSearch,
  Addition,
  Button,
} from "./style.js";
import { connect } from "react-redux";
import { searchFocus, searchBlur } from "../../store/header/action";
const Header = (props) => { // 无状态组件 
  return (
    <HeaderWrapper>
      <Nav>
        <Logo></Logo>
        <NavItem className="left">首页</NavItem>
        <NavItem className="left">下载APP</NavItem>
        <NavSearch
          onFocus={props.handleFocus}
          onBlur={props.handleBlur}
          className={props.focused ? "focused" : ""}
        ></NavSearch>
        <NavItem className="right">登陆</NavItem>
        <NavItem className="right">Aa</NavItem>
      </Nav>
      <Addition>
        {" "}
        <Button className="action icon icon-pen">写文章</Button>
        <Button className="reg">注册</Button>
      </Addition>
    </HeaderWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    focused: state.header.focused,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFocus() {
      dispatch(searchFocus());
    },
    handleBlur() {
      dispatch(searchBlur());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
